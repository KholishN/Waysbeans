package productdto

type CreateProduct struct {
	Title string `json:"title" form:"title" validate:"required"`
	Price int    `json:"price" form:"price" gorm:"type: int" validate:"required"`
	Image string `json:"image" form:"id" validate:"required"`
	Desc  string `json:"desc" form:"desc" validate:"required"`
	Stock int    `json:"stock" form:"stock" validate:"required"`
}

type UpdateProduct struct {
	Title string `json:"title" form:"title"`
	Price int    `json:"price" form:"price"`
	Image string `json:"image" form:"id"`
	Desc  string `json:"desc" form:"desc" validate:"required"`
	Stock int    `json:"stock" form:"stock" validate:"required"`
}

type ProductResponse struct {
	Title string `json:"title" form:"title"`
	Price int    `json:"price" form:"price"`
	Image string `json:"image" form:"image"`
	Desc  string `json:"desc" form:"desc" validate:"required"`
	Stock int    `json:"stock" form:"stock" validate:"required"`
}
