import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../../recipe/services/recipe.service";
import {Recipe} from "../../recipe/recipe.model";
import {map, tap} from "rxjs";
import {AuthService} from "../../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
  }
  postRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put<Recipe[]>('https://ng-recipe-book-d99f2-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes)
      .subscribe(response => console.log(response));
  }

  fetchRecipes() {
      return this.http.get<Recipe[]>('https://ng-recipe-book-d99f2-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
        .pipe(map(recipes => recipes.map(recipe => {
        if (!recipe.ingredients) {
          return {...recipe, ingredients: []}
        }
        return recipe;
      })),
      tap( response => {
        this.recipeService.saveRecipes(response);
      }));
  }
}
