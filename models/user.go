package models

import "time"

type User struct {
	ID         int       `json:"id"`
	Name       string    `json:"name" gorm:"type: varchar(255)"`
	Email      string    `json:"email" gorm:"type: varchar(255)"`
	Password   string    `json:"password" gorm:"type: varchar(255)"`
	Status     string    `json:"status" gorm:"type: varchar(255)"`
	PostalCode int       `json:"postal_code"`
	Address    string    `json:"address"`
	Image      string    `json:"image"`
	CreatedAt  time.Time `json:"-"`
	UpdatedAt  time.Time `json:"-"`
}

type UserNoProfile struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

func (UserNoProfile) TableName() string {
	return "users"
}
