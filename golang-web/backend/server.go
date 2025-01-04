package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/rolandwarburton/gomvc/models/util"
)

type Server struct {
	port           string
	mode           string
	router         *gin.Engine
	// routes         []routes.Route
}

func makeServer(
	port string,
	mode string,
	router *gin.Engine,
) *Server {
	return &Server{
		port,
		mode,
		router,
	}
}

func getPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		fmt.Println("!!! using default port 3000 !!!")
		port = "3000"
	}
	return port
}

func (s *Server) startServer(router *gin.Engine) {
	db, _ := util.Conn()

	// create a server
	addr := fmt.Sprintf("0.0.0.0:%s", s.port)
	srv := &http.Server{
		Addr:    addr,
		Handler: s.router,
	}

	// run the server in a go routine
	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen: %s\n", err)
		}
	}()

	// https://gin-gonic.com/docs/examples/graceful-restart-or-stop/
	// create a channel to wait for an interrupt signal to gracefully shutdown the server
	quit := make(chan os.Signal, 1)

	// when SIGINT or SIGTERM is sent to the process, then notify the "quit" channel
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	// once quit is sent a signal by above signal.Notify we can start shutting down the server
	<-quit

	// the timeout returns ctx which has a Done() channel, we can wait for the channel to be called
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	log.Println("Shutdown server...")
	sqlDB, _ := db.DB()
	sqlDB.Close()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal("Server shutdown:", err)
	} else {
		// the server has closed, cancel the timer
		fmt.Println("server shutdown successful")
		cancel()
	}

	// catch ctx.Done (when N seconds has elapsed, or cancel has been called)
	<-ctx.Done()
	log.Println("server exiting: ", ctx.Err())
}
