package routes

import (
	"fmt"
	"net/http"

	fooditem "github.com/ramenNoodles1998/macros-backend/internal/food-item"
	macrolog "github.com/ramenNoodles1998/macros-backend/internal/macro-log"
	nutritionprofile "github.com/ramenNoodles1998/macros-backend/internal/nutrition-profile"
)
func Router() http.Handler {
	mux := http.NewServeMux()

	macrolog.SetMacroLogRoutes(mux)
	fooditem.SetFoodItemRoutes(mux)
	nutritionprofile.SetNutritionProfileRoutes(mux)

	mux.HandleFunc("/health-check", func (w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "healthy\n")
	})

	return mux
}

