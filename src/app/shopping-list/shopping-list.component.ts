import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] | undefined;

  private igChangeSub: Subscription | undefined;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit() {
      this.ingredients = this.shoppingService.getIngredients();
      this.igChangeSub = this.shoppingService.ingredientsChanged.subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      )
  }

  onEditItem(index: number) {
    console.log(index)
    this.shoppingService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.igChangeSub!.unsubscribe();
  }

}
