import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {Observable} from "rxjs";
import {DataStorageService} from "../shared/services/data-storage.service";
import {RecipeService} from "./services/recipe.service";

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService, private recipesService: RecipeService) {}

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const recipes = this.recipesService.getRecipes()
    if (recipes.length < 1) {
  return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
}

}
