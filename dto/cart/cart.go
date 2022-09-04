package cartdto

type CreateCart struct {
	ID        int    `json:"id"`
	UserID    int    `json:"user_id"`
	ProductID int    `json:"product_id"`
	QTY       int    `json:"qty"`
	SubTotal  int    `json:"subtotal"`
	Status    string `jsom:"status"`
}

type UpdateCart struct {
	ID        int    `json:"id"`
	QTY       int    `json:"qty"`
	SubTotal  int    `json:"subtotal"`
	Status    string `jsom:"status"`
}

type CartResponse struct {
	ID       int `json:"id"`
	QTY      int `json:"qty"`
	SubTotal int `json:"subtotal"`
}
