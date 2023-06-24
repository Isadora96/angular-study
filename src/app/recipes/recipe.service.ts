import { EventEmitter, Inject, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    
    private recipes: Recipe[] = [
        new Recipe(
          'test', 
          'text', 
          'https://hips.hearstapps.com/hmg-prod/images/casserole-recipes-6478d7f325a3a.jpeg',
        [
          new Ingredient('Meat', 1),
          new Ingredient('French fries', 2)
        ]),
        new Recipe(
          'test', 
          'tex1', 
          'https://hips.hearstapps.com/hmg-prod/images/casserole-recipes-6478d7f325a3a.jpeg',
          [
            new Ingredient('Buns', 2)
          ]
          )
      ]

    constructor(private shoppingService: ShoppingListService) {}

    getRecipes() {
       return this.recipes.slice();
    }

    getRecipe(index: number) {
      return this.recipes[index]
    }

    addIngredientsToShoppintList(ingredients: Ingredient[]) {
      this.shoppingService.addIngredients(ingredients);
    }
}