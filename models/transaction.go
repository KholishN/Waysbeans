package models

import "time"

type Transaction struct {
	ID        int64     `json:"id"`
	UserID    int       `json:"user_id"`
	User      User      `json:"user"`
	Status    string    `json:"status"`
	Total     int       `json:"total"`
	CartID    []int     `json:"cart_id" gorm:"-"`
	Cart      []Cart    `json:"product" gorm:"many2many:transaction_cart;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	CreatedAt time.Time `json:"created_at" gorm:"-"`
	UpdatedAt time.Time `json:"updated_at" gorm:"-"`
}

type TransactionResponse struct {
	ID     int64 `json:"id"`
	UserID int   `json:"user_id"`
}

func (TransactionResponse) TableName() string {
	return "transactions"
}
