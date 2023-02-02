package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// a controller must have these properties
type Controller struct {
	name string
	DB   *gorm.DB
}

// getter for the controller
func (c *Controller) GetName() string {
	return c.name
}

// setter for the controller
func (c *Controller) SetName(name string) IController {
	c.name = name
	return c
}

func (controller *Controller) NotImplemented(c *gin.Context) {
	var res = &gin.H{
		"message": "not implemented",
	}
	c.IndentedJSON(http.StatusOK, res)
}
