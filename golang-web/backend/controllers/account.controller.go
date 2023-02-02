package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rolandwarburton/gomvc/errors"
	database "github.com/rolandwarburton/gomvc/models"
	"github.com/rolandwarburton/gomvc/services"
	"gorm.io/gorm"
)

type AccountController struct {
	Controller
}

func NewAccountController(db *gorm.DB) *AccountController {
	controller := &AccountController{
		Controller: Controller{
			name: "test controller",
			DB:   db,
		},
	}
	return controller
}

func (controller AccountController) PostAccount(c *gin.Context) {
	var body database.Account

	// bind the model
	if err := c.ShouldBindJSON(&body); err != nil {
		restError := errors.BadRequest(err.Error())
		c.AbortWithStatusJSON(restError.Status, restError)
		return
	}

	// validate the body
	if err := body.Validate(); err != nil {
		c.AbortWithStatusJSON(err.Status, err)
		return
	}

	// do something with it
	res, err := services.PostAccount(controller.DB, &body)
	if err != nil {
		c.AbortWithStatusJSON(err.Status, err)
		return
	}
	c.IndentedJSON(http.StatusOK, res)
}

func (controller AccountController) DeleteAccount(c *gin.Context) {
	var body database.Account

	// extract the ID from the URL param
	id := c.Param("id")
	if id == "" {
		restError := errors.BadRequest("No ID")
		c.AbortWithStatusJSON(restError.Status, restError)
		return
	}

	// bind the model
	body.ID = id

	// do something with it
	res, err := services.DeleteAccount(controller.DB, &body)
	if err != nil {
		c.AbortWithStatusJSON(err.Status, err)
		return
	}

	c.IndentedJSON(http.StatusOK, res)
}

func (controller AccountController) GetAccount(c *gin.Context) {
	var body database.Account

	// extract the ID from the URL param
	id := c.Param("id")
	if id == "" {
		restError := errors.BadRequest("No ID")
		c.AbortWithStatusJSON(restError.Status, restError)
		return
	}

	// bind the model
	body.ID = id

	// do something with it
	res, err := services.GetAccount(controller.DB, &body)
	if err != nil {
		c.AbortWithStatusJSON(err.Status, err)
		return
	}

	c.IndentedJSON(http.StatusOK, res)
}

func (controller AccountController) GetAccountQuery(c *gin.Context) {
	var object []database.Account
	var q = make(map[string]string)

	if param := c.Query("username"); param != "" {
		q["username"] = c.Query("username")
	} else {
		q["username"] = "*"
	}

	if param := c.Query("is_staff"); param != "" {
		q["is_staff"] = c.Query("is_staff")
	} else {
		q["is_staff"] = "*"
	}

	// TODO check that some params were passed (try not to rely on the defaults too much)
	// ...

	// do something with it
	res, err := services.GetAccountQuery(controller.DB, q, &object, false)
	if err != nil {
		c.AbortWithStatusJSON(err.Status, err)
		return
	}

	c.IndentedJSON(http.StatusOK, res)
}

func (controller AccountController) PatchAccount(c *gin.Context) {
	var body database.Account

	// extract the ID from the URL param
	id := c.Param("id")
	if id == "" {
		restError := errors.BadRequest("No ID")
		c.AbortWithStatusJSON(restError.Status, restError)
		return
	}

	// bind the model
	body.ID = id

	var q = make(map[string]string)

	if param := c.Query("username"); param != "" {
		q["username"] = c.Query("username")
	} else {
		q["username"] = ""
	}

	if param := c.Query("is_staff"); param != "" {
		q["is_staff"] = c.Query("is_staff")
	} else {
		q["is_staff"] = ""
	}

	// do something with it
	res, err := services.PatchAccount(controller.DB, &body, q)
	if err != nil {
		c.AbortWithStatusJSON(err.Status, err)
		return
	}

	c.IndentedJSON(http.StatusOK, res)
}
