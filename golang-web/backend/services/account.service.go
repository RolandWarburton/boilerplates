package services

import (
	"encoding/base64"
	"fmt"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/rolandwarburton/gomvc/errors"
	database "github.com/rolandwarburton/gomvc/models"
	"gorm.io/gorm"
)

type IAccountService interface {
	PostAccount(db *gorm.DB, object *database.Account) (gin.H, *errors.RestError)
	DeleteAccount(db *gorm.DB, object *database.Account) (gin.H, *errors.RestError)
	GetAccount(db *gorm.DB, object *database.Account) (gin.H, *errors.RestError)
	GetAccounts(db *gorm.DB) (gin.H, *errors.RestError)
	PatchAccount(db *gorm.DB, object *database.Account, query map[string]string) (gin.H, *errors.RestError)
	GetAccountQuery(db *gorm.DB, query map[string]string, objects *[]database.Account)
}

func PostAccount(db *gorm.DB, object *database.Account) (gin.H, *errors.RestError) {
	dbc := db.Where("username = ?", object.Username).FirstOrCreate(&object)

	if dbc.Error != nil {
		return nil, errors.NotFound(fmt.Sprintf("account not created: %v", dbc.Error))
	}

	return gin.H{
		"rowsAffected": dbc.RowsAffected,
		"result":       object,
	}, nil
}

func DeleteAccount(db *gorm.DB, object *database.Account) (gin.H, *errors.RestError) {
	var res database.Account
	dbc := db.Where("id = ?", object.ID).Delete(&res)

	if dbc.Error != nil {
		return nil, errors.NotFound(fmt.Sprintf("account not deleted: %v", dbc.Error))
	}

	return gin.H{
		"rowsAffected": dbc.RowsAffected,
		"result":       res,
	}, nil
}

func GetAccount(db *gorm.DB, object *database.Account) (gin.H, *errors.RestError) {
	dbc := db.First(&object)

	if dbc.Error != nil {
		return nil, errors.NotFound(fmt.Sprintf("account not found: %v", dbc.Error))
	}

	return gin.H{
		"count":  dbc.RowsAffected,
		"result": object,
	}, nil
}

func GetAccounts(db *gorm.DB) (gin.H, *errors.RestError) {
	var count int64
	var accounts []database.Account

	db.Find(&accounts)
	if len(accounts) == 0 {
		return nil, errors.NotFound(fmt.Sprintf("accounts not found: %v", "zero accounts"))
	}

	db.Table("accounts").Count(&count)

	return gin.H{
		"count":  count,
		"result": accounts,
	}, nil
}

func PatchAccount(db *gorm.DB, object *database.Account, query map[string]string) (gin.H, *errors.RestError) {
	dbc := db.First(&object)

	if dbc.Error != nil {
		return nil, errors.NotFound(fmt.Sprintf("account not found: %v", dbc.Error))
	}

	if query["username"] != "" {
		object.Username = query["username"]
	}

	if query["is_staff"] != "" {
		b, ok := strconv.ParseBool(query["is_staff"])
		if ok == nil {
			object.Is_staff = b
		}
	}

	dbc.Save(&object)

	return gin.H{
		"count":  dbc.RowsAffected,
		"result": object,
	}, nil
}

// returns account
func Login(db *gorm.DB, auth *database.Auth, account *database.Account) (gin.H, *errors.RestError) {
	decodedBytes, err := base64.StdEncoding.DecodeString(auth.Auth)
	if err != nil {
		return nil, errors.BadRequest("Failed to decode auth payload")
	}
	authString := string(decodedBytes)
	fmt.Println("Decoded string:", authString)

	// split the username and password
	var userAndPass = strings.Split(authString, ":")
	if len(userAndPass) != 2 {
		fmt.Println("bad request username and password were not decoded")
		return nil, errors.BadRequest("Failed to decode")
	}

	username := userAndPass[0]
	password := userAndPass[1]

	dbc := db.
		Model(database.Account{}).
		Where("username = ? AND password = ?", username, password).First(&account)

	if dbc.Error != nil {
		return nil, errors.NotFound(fmt.Sprintf("account(s) not found: %v", dbc.Error))
	}

	return gin.H{
		"count":  dbc.RowsAffected,
		"result": account,
	}, nil
}

// strict means that wildcards will be used on either side of the username
func GetAccountQuery(db *gorm.DB, query map[string]string, objects *[]database.Account, strict bool) (gin.H, *errors.RestError) {
	fields := []string{}
	values := []interface{}{}

	if strict {
		if query["username"] != "*" {
			fields = append(fields, "username = ?")
			values = append(values, query["username"])
		}
	} else {
		if query["username"] != "*" {
			fields = append(fields, "username LIKE ?")
			values = append(values, "%"+query["username"]+"%")
		}
	}

	if query["is_staff"] != "*" {
		fields = append(fields, "is_staff = ?")
		values = append(values, query["is_staff"])
	}

	switch query["password"] {
	case "*", "":
	default:
		fields = append(fields, "password = ?")
		values = append(values, query["password"])
	}

	dbc := db.
		Model(database.Account{}).
		Where(strings.Join(fields, " AND "), values...).
		Find(&objects)

	if dbc.Error != nil {
		return nil, errors.NotFound(fmt.Sprintf("account(s) not found: %v", dbc.Error))
	}

	return gin.H{
		"count":  dbc.RowsAffected,
		"result": objects,
	}, nil
}
