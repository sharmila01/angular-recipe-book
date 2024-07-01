import {Recipe} from "../recipe.model";
import {Ingredient} from "../../shopping-list/ingredient.model";
import {Subject} from "rxjs";
import {DataStorageService} from "../../shared/services/data-storage.service";

export class RecipeService {
  public recipesChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Apple pie',
  //     "You'll need apples and a dough",
  //     'https://assets.epicurious.com/photos/59bc150e74febd49ca741558/1:1/w_3197,h_3197,c_limit/CINNAMON-CRUMBLE-APPLE-PIE-RECIPE-07092017.jpg',
  //     [new Ingredient('Flour', 3), new Ingredient('Sugar', 10)]),
  //   new Recipe(
  //     'Mango pie',
  //     "You'll need mangoes and a dough",
  //     'https://www.tasteofhome.com/wp-content/uploads/2018/01/Mango-Pie-with-Coconut-Crust_exps168868_TH133086A07_24_10bC_RMS-3.jpg?fit=700,1024',
  //     [new Ingredient('Fish', 2), new Ingredient('Salt', 9)]),
  // ];
  private recipes: Recipe[] = [];
  getRecipes() {
    return [...this.recipes];
  }
  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipesChanged.next([...this.recipes]);
  }

  updateRecipe(index:number, updatedRecipe: Recipe) {
    this.recipes[index] = updatedRecipe;
    this.recipesChanged.next([...this.recipes]);
  }

  deleteRecipe (index: number) {
    this.recipes.splice(index,1);
    this.recipesChanged.next([...this.recipes]);
  }

  saveRecipes (newRecipes: Recipe[]) {
    this.recipes = newRecipes;
    this.recipesChanged.next([...this.recipes]);
  }
}
