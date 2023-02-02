package util

import (
	"time"

	database "github.com/rolandwarburton/gomvc/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func Conn() (*gorm.DB, error) {
	dsn := "host=assets_db user=assets password=rhinos dbname=assets port=5432 sslmode=disable TimeZone=Etc/Utc"
	db, err := gorm.Open(postgres.Open(dsn),
		&gorm.Config{
			Logger: logger.Default.LogMode(logger.Info),
			NowFunc: func() time.Time {
				utc, _ := time.LoadLocation("")
				return time.Now().In(utc)
			},
		},
	)

	if err != nil {
		return nil, err
	} else {
		db.AutoMigrate(&database.Account{})
		return db, nil
	}
}
