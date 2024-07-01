import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/services/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
  public isLoggedIn = false;
  public userSub: Subscription;
  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private router: Router ) {}

  ngOnInit() {
    this.authService.user.subscribe((user)=>{
      this.isLoggedIn = !!user;
      console.log(!user);
      console.log(!!user);
    })
  }

  onLogIn(){
    this.router.navigate(['/auth'])
  }
  onLogOut(){
    this.authService.logOut();
  }
  onSaveData() {
    this.dataStorageService.postRecipes();
  }
  onFetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
