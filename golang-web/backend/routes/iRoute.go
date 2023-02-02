package routes

import "github.com/gin-gonic/gin"

// import "github.com/gin-gonic/gin"

// go uses duck typing
// so for example the routeFactory.go can return an IRoute
// and Route can implement it
type IRoute interface {
	GetPath() string
	WithPath(path string) Route
	WithMiddleware(middleware Middleware) Route
	Register(verb string, e *gin.RouterGroup, method gin.HandlerFunc)
}
