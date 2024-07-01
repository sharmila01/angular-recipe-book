import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "./recipe.model";
import {RecipeService} from "./services/recipe.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit, OnDestroy {
  // currentRecipe: Recipe;
  // subCurrentRecipe: Subscription;
  constructor(private recipeService: RecipeService) { }
ngOnInit() {
    // this.subCurrentRecipe =  this.recipeService.currentRecipe
    //   .subscribe((recipe: Recipe)=>{
    //   this.currentRecipe = recipe;
    // })

}

ngOnDestroy() {
    // this.subCurrentRecipe.unsubscribe();
}
}
