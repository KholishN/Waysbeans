package repositories

import (
	"waysbeans/models"

	"gorm.io/gorm"
)

type CartRepository interface {
	FindCarts() ([]models.Cart, error)
	GetCart(ID int) (models.Cart, error)
	CreateCart(Cart models.Cart) (models.Cart, error)
	UpdateCart(Cart []models.Cart) ([]models.Cart, error)
	UpdateeCart(Cart models.Cart) (models.Cart, error)
	DeleteCart(Cart models.Cart) (models.Cart, error)
	CreateTransactionID(transaction models.Transaction) (models.Transaction, error)
	FindProductID(ProductID []int) ([]models.Product, error)
	FindCartsTransaction(TrxID int) ([]models.Cart, error)
}

// type repository struct {
// 	db *gorm.DB
// }

func RepositoryCart(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindCarts() ([]models.Cart, error) {
	var carts []models.Cart
	err := r.db.Preload("Product").Preload("Topping").Preload("Transaction").Find(&carts).Error

	return carts, err
}

func (r *repository) GetCart(ID int) (models.Cart, error) {
	var cart models.Cart
	err := r.db.Preload("Product").First(&cart, ID).Error

	return cart, err
}

func (r *repository) CreateCart(cart models.Cart) (models.Cart, error) {
	err := r.db.Preload("Product").Create(&cart).Error

	return cart, err
}

func (r *repository) UpdateCart(cart []models.Cart) ([]models.Cart, error) {
	err := r.db.Save(&cart).Error

	return cart, err
}

func (r *repository) UpdateeCart(cart models.Cart) (models.Cart, error) {
	err := r.db.Save(&cart).Error

	return cart, err
}

func (r *repository) DeleteCart(cart models.Cart) (models.Cart, error) {
	err := r.db.Delete(&cart).Error

	return cart, err
}

func (r *repository) CreateTransactionID(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&transaction).Error

	return transaction, err
}

func (r *repository) FindProductID(ToppingID []int) ([]models.Product, error) {
	var product []models.Product
	err := r.db.Find(&product, ToppingID).Error

	return product, err
}

func (r *repository) FindCartsTransaction(TrxID int) ([]models.Cart, error) {
	var carts []models.Cart
	err := r.db.Preload("Product").Find(&carts, "user_id = ? AND status = ?", TrxID, "on").Error

	return carts, err
}
