package database

import (
	"time"

	"github.com/rolandwarburton/gomvc/errors"
)

type Account struct {
	ID        string    `gorm:"primaryKey;size:36;default:gen_random_uuid()" json:"id"`
	Username  string    `gorm:"size:50;notNull;unique" json:"username"`
	Password  string    `gorm:"size:128;notNull" json:"password"`
	Is_staff  bool      `gorm:"default:true;notNull" json:"is_staff"`
	CreatedAt time.Time `gorm:"notNull;type:timestamp" json:"created_at"`
	UpdatedAt time.Time `gorm:"notNull;type:timestamp" json:"updated_at"`
}

// this can be called inside the controller
func (account *Account) Validate() *errors.RestError {
	// TODO actually implement this
	if account.ID == "123" {
		return errors.BadRequest("bad request")
	}
	return nil
}
