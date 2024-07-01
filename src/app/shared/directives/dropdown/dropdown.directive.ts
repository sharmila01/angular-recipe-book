import {Directive, HostBinding, HostListener} from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  @HostBinding('class.open') dropdownState = false;

  @HostListener('click') toggleDropdown(){
    this.dropdownState = !this.dropdownState;
  }
}
