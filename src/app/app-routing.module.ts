import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {RecipeComponent} from "./recipe/recipe.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeDetailComponent} from "./recipe/recipe-detail/recipe-detail.component";
import {NoItemSelectedComponent} from "./recipe/recipe-list/no-item-selected/no-item-selected.component";
import {RecipeEditComponent} from "./recipe/recipe-list/recipe-item/recipe-edit/recipe-edit.component";
import {RecipesResolverService} from "./recipe/recepies-resolver.service";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./auth/auth.guard";


const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path:'recipes', component: RecipeComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: NoItemSelectedComponent, pathMatch: 'full'},
      {path: 'new-recipe', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
    ]},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'auth', component: AuthComponent},
  {path: '**', redirectTo: '/recipes'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
