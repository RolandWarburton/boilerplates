package routes

import (
	"github.com/gin-gonic/gin"
)

type Middleware struct {
	GET    []func() gin.HandlerFunc
	POST   []func() gin.HandlerFunc
	DELETE []func() gin.HandlerFunc
	PATCH  []func() gin.HandlerFunc
}

// a route must have these properties
type Route struct {
	path       string
	middleware Middleware
}

// ================================================================================================
// implement the IRoute interface methods below
// ================================================================================================

// getter for the controller
func (c Route) GetPath() string {
	return c.path
}

func (r Route) Register(verb string, e *gin.RouterGroup, method gin.HandlerFunc) {
	var routeFunc func(string, ...gin.HandlerFunc)

	// map the verb to the corresponding Gin route method
	switch verb {
	case "GET":
		routeFunc = func(path string, handlers ...gin.HandlerFunc) {
			e.GET(path, handlers...)
		}
	case "POST":
		routeFunc = func(path string, handlers ...gin.HandlerFunc) {
			e.POST(path, handlers...)
		}
	case "DELETE":
		routeFunc = func(path string, handlers ...gin.HandlerFunc) {
			e.DELETE(path, handlers...)
		}
	case "PATCH":
		routeFunc = func(path string, handlers ...gin.HandlerFunc) {
			e.PATCH(path, handlers...)
		}
	default:
		panic("Unsupported HTTP verb")
	}

	// retrieve middleware for the verb
	var middleware []func() gin.HandlerFunc
	switch verb {
	case "GET":
		middleware = r.middleware.GET
	case "POST":
		middleware = r.middleware.POST
	case "DELETE":
		middleware = r.middleware.DELETE
	case "PATCH":
		middleware = r.middleware.PATCH
	default:
		middleware = nil
	}

	// append middleware if it exists
	if middleware == nil {
		routeFunc(r.path, method)
	} else {
		// construct an array of middleware handlers
		handlers := make([]gin.HandlerFunc, len(middleware)+1)
		for i, m := range middleware {
			handlers[i] = m()
		}
		// append the controller handler
		handlers[len(middleware)] = method
		routeFunc(r.path, handlers...)
	}
}

// this is part of the "builder" pattern
// that allows us to chain WithPath, eg NewRouteOne.WithPath("/foo")
func (r Route) WithPath(path string) Route {
	r.path = path
	return r
}

func (r Route) WithMiddleware(middleware *Middleware) Route {
	r.middleware = *middleware
	return r
}
