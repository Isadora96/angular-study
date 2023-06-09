import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  @Output() recipeWasSelected= new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('test', 'text', 'https://hips.hearstapps.com/hmg-prod/images/casserole-recipes-6478d7f325a3a.jpeg'),
    new Recipe('test', 'tex1', 'https://hips.hearstapps.com/hmg-prod/images/casserole-recipes-6478d7f325a3a.jpeg')
  ];

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
