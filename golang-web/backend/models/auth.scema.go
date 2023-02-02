package database

type Auth struct {
	Username  string    `gorm:"size:50;notNull" json:"username"`
	Password  string    `gorm:"size:128;notNull" json:"password"`
}

