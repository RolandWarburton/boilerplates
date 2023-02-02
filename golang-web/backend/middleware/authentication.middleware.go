package middleware

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	assets_utils "github.com/rolandwarburton/gomvc/utils"
)

func CheckAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		// There are three ways for the client to carry a Token. 1 Put in request header 2 Put in the request body 3 Put in URI
		// Here, it is assumed that the Token is placed in the Authorization of the Header and starts with Bearer
		// The specific implementation method here should be determined according to your actual business situation
		authHeader := c.Request.Header.Get("Authorization")
		fmt.Println(authHeader)
		if authHeader == "" {
			c.JSON(http.StatusOK, gin.H{
				"code":    203,
				"message": "Request header auth Empty",
			})
			c.Abort()
			return
		}

		// Split by space
		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(http.StatusOK, gin.H{
				"code":    204,
				"message": "Request header auth Incorrect format",
			})
			c.Abort()
			return
		}

		// parts[1] is the obtained tokenString
		mc, err := assets_utils.ParseToken(parts[1])
		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"code":    205,
				"message": "invalid Token",
			})
			c.Abort()
			return
		}
		// Save the currently requested username information to the requested context c
		c.Set("username", mc.Username)
		c.Next() // Subsequent processing functions can use c.Get("username") to obtain the currently requested user information
	}
}
