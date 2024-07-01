import { Ingredient } from "../ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 1),
    new Ingredient('Mango', 2)
  ]
  constructor() {
  }
  getIngredients() {
    return [...this.ingredients];
  }
  getIngredient(index: number) {
    return this.ingredients[index];
  }
  onAddIngredients (value) {
    this.ingredients.unshift(...value);
    this.ingredientsChanged.next([...this.ingredients])
  }
  onAddIngredient (value) {
    this.ingredients.unshift(value);
    this.ingredientsChanged.next([...this.ingredients])
  }
  onUpdateIngredient (index: number, updatedIngredient: Ingredient) {
    this.ingredients[index] = updatedIngredient;
    this.ingredientsChanged.next([...this.ingredients]);
  }

  onRemoveIngredient (index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next([...this.ingredients])
  }
}
