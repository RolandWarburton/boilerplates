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
	"github.com/rolandwarburton/gomvc/controllers"
	"github.com/rolandwarburton/gomvc/middleware"
	"github.com/rolandwarburton/gomvc/models/util"
	"github.com/rolandwarburton/gomvc/routes"
)

type Server struct {
	port           int
	mode           string
	trustedProxies []string
	routes         []routes.Route
}

func main() {
	db, _ := util.Conn()

	gin.SetMode("debug")

	// create a router for the whole framework
	router := gin.New()
	router.SetTrustedProxies([]string{"127.0.0.1"})
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	v1 := router.Group("/")
	v1_unauthenticated := router.Group("/")

	// an example of applying middleware to an entire route group
	// v1.Use(middleware.CheckAuth())

	authController := controllers.NewAuthController(db)
	accountController := controllers.NewAccountController(db)

	// AUTH ROUTES
	route, _ := routes.GetRoute("auth", routes.Middleware{})
	route.Register("POST", v1_unauthenticated, authController.Authenticate)

	// ACCOUNT ROUTES
	accountMiddleware := &routes.Middleware{
		POST: []func() gin.HandlerFunc{middleware.CheckAuth},
		GET: []func() gin.HandlerFunc{middleware.CheckAuth},
		PATCH: []func() gin.HandlerFunc{middleware.CheckAuth},
		DELETE: []func() gin.HandlerFunc{middleware.CheckAuth},
	}
	route, _ = routes.GetRoute("account", *accountMiddleware)
	route.Register("POST", v1, accountController.PostAccount)

	route, _ = routes.GetRoute("account/:id", *accountMiddleware)
	route.Register("GET", v1, accountController.GetAccount)
	route.Register("DELETE", v1, accountController.DeleteAccount)
	route.Register("PATCH", v1, accountController.PatchAccount)

	route, _ = routes.GetRoute("accounts", *accountMiddleware)
	route.Register("GET", v1, accountController.GetAccountQuery)

	// create a server
	srv := &http.Server{
		Addr:    "0.0.0.0:3000",
		Handler: router,
	}

	// run the server in a go routine
	go func() {
		// service connections
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
