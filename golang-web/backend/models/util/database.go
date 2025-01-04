package util

import (
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"github.com/rolandwarburton/gomvc/models"
)

func Conn() (*gorm.DB, error) {
	dsn := "host=example_db user=example password=rhinos dbname=example port=5432 sslmode=disable TimeZone=Etc/Utc"
	gormConfig := &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
		NowFunc: func() time.Time {
			utc, _ := time.LoadLocation("")
			return time.Now().In(utc)
		},
	}
	db, err := gorm.Open(postgres.Open(dsn), gormConfig)

	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&database.Account{})
	return db, nil
}
