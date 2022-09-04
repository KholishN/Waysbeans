package repositories

import (
	"fmt"
	"waysbeans/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransactions() ([]models.Transaction, error)
	FindCartsTransactions(TrxID int) ([]models.Cart, error)
	GetTransaction(ID int) (models.Transaction, error)
	GetTransactions(ID int64) (models.Transaction, error)
	GetUserTransaction(ID int) ([]models.Transaction, error)
	GetOneTransaction(ID string) (models.Transaction, error)
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	UpdateTransaction(transaction models.Transaction) (models.Transaction, error)
	UpdateTransactions(status string, ID string) error
	DeleteTransaction(transaction models.Transaction) (models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}
func (r *repository) FindTransactions() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("User").Find(&transactions).Error
	return transactions, err
}

func (r *repository) FindCartsTransactions(TrxID int) ([]models.Cart, error) {
	var carts []models.Cart
	err := r.db.Preload("Product").Find(&carts, "user_id = ? AND status = ?", TrxID, "on").Error

	return carts, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User").Find(&transaction, ID).Error
	return transaction, err
}

func (r *repository) GetTransactions(ID int64) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User").Find(&transaction, ID).Error
	return transaction, err
}

func (r *repository) GetUserTransaction(ID int) ([]models.Transaction, error) {
	var transaction []models.Transaction
	err := r.db.Preload("User").Preload("Cart").Preload("Cart.Product").Debug().Find(&transaction, "user_id = ?", ID).Error
	return transaction, err
}

func (r *repository) GetOneTransaction(ID string) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User").Preload("Product").First(&transaction, "id = ?", ID).Error

	return transaction, err
}

func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Save(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransactions(status string, ID string) error {
	var transaction models.Transaction
	r.db.Preload("User").Preload("Product").First(&transaction, ID)
	fmt.Println("===========", transaction)

	// If is different & Status is "success" decrement product quantity
	if status != transaction.Status && status == "success" {
		var cart []models.Cart
		r.db.Debug().Preload("Product").Find(&cart, "user_id = ?", transaction.User.ID)

		for _, p := range cart {

			var product models.Product
			r.db.First(&product, p.Product.ID)
			product.Stock = product.Stock - p.QTY
			r.db.Save(&product)
		}

	}

	transaction.Status = status

	err := r.db.Save(&transaction).Error

	return err
}

func (r *repository) DeleteTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Delete(&transaction).Error

	return transaction, err
}
