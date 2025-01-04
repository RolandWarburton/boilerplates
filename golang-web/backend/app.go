package main

import (
	"github.com/gin-gonic/gin"
	"github.com/rolandwarburton/gomvc/controllers"
	"github.com/rolandwarburton/gomvc/middleware"
	"github.com/rolandwarburton/gomvc/models/util"
	"github.com/rolandwarburton/gomvc/routes"
)

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
	v1.Use(middleware.CheckAuth())

	authController := controllers.NewAuthController(db)
	accountController := controllers.NewAccountController(db)
	simpleController := controllers.NewSimpleController()

	// AUTH ROUTES
	route, _ := routes.GetRoute("auth", &routes.Middleware{})
	route.Register("POST", v1_unauthenticated, authController.Authenticate)

	// ACCOUNT ROUTES
	accountMiddleware := &routes.Middleware{
		POST:   []func() gin.HandlerFunc{},
		GET:    []func() gin.HandlerFunc{},
		PATCH:  []func() gin.HandlerFunc{},
		DELETE: []func() gin.HandlerFunc{},
		// for example
		// DELETE: []func() gin.HandlerFunc{middleware.CheckAuth},
	}
	route, _ = routes.GetRoute("account", accountMiddleware)
	route.Register("POST", v1, accountController.PostAccount)

	route, _ = routes.GetRoute("account/:id", accountMiddleware)
	route.Register("GET", v1, accountController.GetAccount)
	route.Register("DELETE", v1, accountController.DeleteAccount)
	route.Register("PATCH", v1, accountController.PatchAccount)

	route, _ = routes.GetRoute("accounts", accountMiddleware)
	route.Register("GET", v1, accountController.GetAccountQuery)

	route, _ = routes.GetRoute("simple", accountMiddleware)
	route.Register("GET", v1, simpleController.SimpleGET)

	route, _ = routes.GetRoute("simple/:id", accountMiddleware)
	route.Register("GET", v1, simpleController.SimpleGETArgs)

	port := getPort()
	server := makeServer(port, "debug", router)
	server.startServer(router)
}
