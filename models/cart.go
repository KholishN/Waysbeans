package models

type Cart struct {
	ID        int           `json:"id" gorm:"primary_key:auto_increment"`
	QTY       int           `json:"qty"`
	SubTotal  int           `json:"subtotal"`
	ProductID int           `json:"product_id" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Product   Product       `json:"product" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	UserID    int           `json:"user_id"`
	User      UserNoProfile `json:"user"`
	Status    string        `json:"status"`
}

type CartResponse struct {
	ID        int     `json:"id" gorm:"primary_key:auto_increment"`
	QTY       int     `json:"qty"`
	SubTotal  int     `json:"subtotal"`
	ProductID int     `json:"product_id" gorm:"-"`
	Product   Product `json:"product"`
	Status    string  `json:"status"`
}

func (CartResponse) TableName() string {
	return "carts"
}
