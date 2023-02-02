package controllers

import "github.com/gin-gonic/gin"

type IController interface {
	GetName() string
	SetName(name string) IController
	NotImplemented(c *gin.Context)
}
