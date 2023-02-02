package errors

import "net/http"

// struct that describes a REST error
type RestError struct {
	Message string `json:"message"`
	Status  int    `json:"status"`
	Error   string `json:"error"`
}

// this can be called by validation, or any controller etc
// to standardize errors
func BadRequest(message string) *RestError {
	return &RestError{
		Message: message,
		Status:  http.StatusBadRequest,
		Error:   "Invalid Request",
	}
}

func NotFound(message string) *RestError {
	return &RestError{
		Message: message,
		Status:  http.StatusNotFound,
		Error:   "Not Found",
	}
}
