import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../shopping-list/services/shopping-list.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecipeService} from "../services/recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{

  public recipe: Recipe;
  public id: number;
  constructor(private shoppingListService: ShoppingListService,
              private recipeService: RecipeService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    })
  // const id = this.activatedRoute.snapshot.params['id'];
  // this.recipe = this.recipeService.getRecipe(+id);
}

onSendToList() {
  this.shoppingListService.onAddIngredients(this.recipe.ingredients);
}

  onEditClick() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
  }
  onDeleteClick() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }
}
