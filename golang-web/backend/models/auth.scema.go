package database

type Auth struct {
	Auth  string    `gorm:"size:512;notNull" json:"auth"`
}
