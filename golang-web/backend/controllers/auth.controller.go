package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
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
	var user database.Auth
	err := c.Bind(&user)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"code":    201,
			"message": "Invalid parameter",
		})
		return
	}

	// Verify that the user name and password are correct
	// create a query for the database
	var accounts []database.Account
	var q = make(map[string]string)
	q["username"] = user.Username
	q["password"] = user.Password
	q["is_staff"] = "*"

	// look up the account
	services.GetAccountQuery(controller.DB, q, &accounts, true)
	if len(accounts) == 0 {
		c.JSON(http.StatusOK, gin.H{
			"code":    202,
			"message": "Authentication failed. Invalid username of password?",
		})
		return
	}

	// Generate Token
	tokenString, _ := example_utils.GenToken(user.Username)
	c.JSON(http.StatusOK, gin.H{
		"code":    200,
		"message": "success",
		"data":    gin.H{"token": tokenString},
	})
}
