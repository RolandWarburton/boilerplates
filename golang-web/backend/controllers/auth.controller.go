package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rolandwarburton/gomvc/errors"
	database "github.com/rolandwarburton/gomvc/models"
	"github.com/rolandwarburton/gomvc/services"
	example_utils "github.com/rolandwarburton/gomvc/utils"
	"gorm.io/gorm"
)

type AuthController struct {
	Controller
}

func NewAuthController(db *gorm.DB) *AuthController {
	controller := &AuthController{
		Controller: Controller{
			name: "test controller",
			DB:   db,
		},
	}
	return controller
}

// based on this tutorial
// https://programmer.ink/think/using-jwt-in-the-gin-framework.html
func (controller AuthController) Authenticate(c *gin.Context) {
	var auth database.Auth
	err := c.Bind(&auth)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"code":    201,
			"message": "Invalid parameter",
		})
		return
	}

	var account database.Account
	var restError *errors.RestError

	// look up the account
	_, restError = services.Login(controller.DB, &auth, &account)
	if restError != nil {
		c.JSON(http.StatusOK, gin.H{
			"code":    202,
			"message": "Authentication failed. Invalid username or password?",
		})
		return
	}

	// Generate Token
	tokenString, _ := example_utils.GenToken(account.Username)
	c.JSON(http.StatusOK, gin.H{
		"code":    200,
		"message": "success",
		"data":    gin.H{"token": tokenString},
	})
}
