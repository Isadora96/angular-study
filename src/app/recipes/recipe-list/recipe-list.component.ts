import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('test', 'text', 'https://hips.hearstapps.com/hmg-prod/images/casserole-recipes-6478d7f325a3a.jpeg')
  ];
}
