package routes

import (
	"errors"
)

// factory for creating routes
func GetRoute(sw string, middleware *Middleware) (IRoute, error) {
	switch sw {
	case "account":
		route := NewBaiscRoute().WithPath("/account").WithMiddleware(middleware)
		return route, nil
	case "account/:id":
		route := NewBaiscRoute().WithPath("/account/:id").WithMiddleware(middleware)
		return route, nil
	case "accounts":
		route := NewBaiscRoute().WithPath("/accounts").WithMiddleware(middleware)
		return route, nil
	case "auth":
		route := NewBaiscRoute().WithPath("/auth").WithMiddleware(middleware)
		return route, nil
	case "simple":
		route := NewBaiscRoute().WithPath("/simple").WithMiddleware(middleware)
		return route, nil
	case "simple/:id":
		route := NewBaiscRoute().WithPath("/simple/:id")
		return route, nil
	}

	return nil, errors.New("wrong route specified")
}
