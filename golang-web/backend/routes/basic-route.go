package routes

// this custom route extends the Route
type RouteOne struct {
	Route
}

// builder for creating a new route
func NewBaiscRoute() RouteOne {
	return RouteOne{
		Route: Route{
			path: "/404",
		},
	}
}
