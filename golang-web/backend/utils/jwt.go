package example_utils

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

// MyClaims custom declaration structure and embedded JWT StandardClaims
// jwt package comes with jwt Standardclaims contains only official fields
// We need to record an additional username field here, so we need to customize the structure
// If you want to save more information, you can add it to this structure
type MyClaims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

const TokenExpireDuration = time.Hour * 2

var MySecret = []byte("Summer slipped away")

// GenToken generates JWT
func GenToken(username string) (string, error) {
	// Create our own statement
	c := MyClaims{
		username, // Custom field
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(TokenExpireDuration).Unix(), // Expiration time
			Issuer:    "my-project",                               // Issuer
		},
	}
	// Creates a signed object using the specified signing method
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, c)
	// Use the specified secret signature and obtain the complete encoded string token
	return token.SignedString(MySecret)
}

// ParseToken parsing JWT
func ParseToken(tokenString string) (*MyClaims, error) {
	// Parse token
	token, err := jwt.ParseWithClaims(tokenString, &MyClaims{}, func(token *jwt.Token) (i interface{}, err error) {
		return MySecret, nil
	})
	if err != nil {
		return nil, err
	}
	if claims, ok := token.Claims.(*MyClaims); ok && token.Valid { // Verification token
		return claims, nil
	}
	return nil, errors.New("invalid token")
}

