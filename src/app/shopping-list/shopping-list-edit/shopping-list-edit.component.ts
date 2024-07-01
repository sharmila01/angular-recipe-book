import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../ingredient.model";
import {ShoppingListService} from "../services/shopping-list.service";
import {Subscription} from "rxjs";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm: NgForm;
editedItemIndex: number;
subscription: Subscription;
public editMode = false;
public editedItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
   this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
     this.editMode = true;
     this.editedItemIndex = index;
     this.editedItem = this.shoppingListService.getIngredient(index);
     this.shoppingListForm.setValue({
       name: this.editedItem.name,
       amount: this.editedItem.amount
     })
   });
  }

  onClear() {
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onSubmitItem(form: NgForm){
    if(this.editMode) {
      this.shoppingListService.onUpdateIngredient(this.editedItemIndex, new Ingredient(form.value.name, form.value.amount));
    } else {
      this.shoppingListService.onAddIngredient(new Ingredient(form.value.name, form.value.amount));
    }
    this.onClear();
  }


  onDeleteIngredient() {
    this.shoppingListService.onRemoveIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
