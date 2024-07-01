import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "./ingredient.model";
import {ShoppingListService} from "./services/shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe((value: Ingredient[]) => { this.ingredients = value});
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditIngredient (value: number) {
    this.shoppingListService.startedEditing.next(value);
  }
}
