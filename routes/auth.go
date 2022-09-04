package routes

import (
	"waysbucks/handlers"
	"waysbucks/pkg/middleware"
	"waysbucks/pkg/mysql"
	"waysbucks/repositories"

	"github.com/gorilla/mux"
)

func AuthRoutes(r *mux.Router) {
	authReposutory := repositories.RepositoryAuth(mysql.DB)
	h := handlers.HandlerAuth(authReposutory)

	r.HandleFunc("/register", middleware.UploadFile(h.Register)).Methods("POST")
	r.HandleFunc("/login", h.Login).Methods("POST")
	r.HandleFunc("/check-auth", middleware.Auth(h.CheckAuth)).Methods("GET")
}
