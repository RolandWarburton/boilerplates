package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type SimpleController struct {
	Controller
}

func NewSimpleController() *SimpleController {
	Controller := &SimpleController{
		Controller: Controller{
			name: "simple controller",
		},
	}
	return Controller
}

func (controller SimpleController) SimpleGET(c *gin.Context) {
	// var err error = nil
	// if err != nil {
	// 	c.AbortWithStatus(http.StatusForbidden)
	// }

	c.IndentedJSON(http.StatusOK, gin.H{"message": "hello world"})
}

func (controller SimpleController) SimpleGETArgs(c *gin.Context) {
	arg := c.Param("id")

	var err error = nil
	if err != nil || arg == "" {
		c.AbortWithStatus(http.StatusForbidden)
	}

	c.IndentedJSON(http.StatusOK, gin.H{"message": "hello world", "argument": arg})
}
