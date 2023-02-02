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

// register a new controller method on this route
func (r Route) Register(verb string, e *gin.RouterGroup, method gin.HandlerFunc) {
	switch verb {
	case "GET":
		if r.middleware.GET == nil {
			e.GET(r.path, method)
		} else {
			for _, m := range r.middleware.GET {
				e.GET(r.path, m(), method)
			}
		}
	case "POST":
		if r.middleware.POST == nil {
			e.POST(r.path, method)
		} else {
			for _, m := range r.middleware.POST {
				e.POST(r.path, m(), method)
			}
		}
	case "DELETE":
		if r.middleware.DELETE == nil {
			e.DELETE(r.path, method)
		} else {
			for _, m := range r.middleware.DELETE {
				e.DELETE(r.path, m(), method)
			}
		}
	case "PATCH":
		if r.middleware.PATCH == nil {
			e.PATCH(r.path, method)
		} else {
			for _, m := range r.middleware.PATCH {
				e.PATCH(r.path, m(), method)
			}
		}
	}
}

// this is part of the "builder" pattern
// that allows us to chain WithPath, eg NewRouteOne.WithPath("/foo")
func (r Route) WithPath(path string) Route {
	r.path = path
	return r
}

func (r Route) WithMiddleware(middleware Middleware) Route {
	r.middleware = middleware
	return r
}
