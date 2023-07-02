import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>;
    
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

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
}