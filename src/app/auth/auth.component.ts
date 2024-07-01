import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
/*import {User} from "./user.model";*/
import {Observable, Subscription} from "rxjs";
import {IAuthResponse} from "./auth.types";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  public isLoginMode = true;
  public isLoading = false;
  public error: string = null;
  // public user: User;
  // private userSub: Subscription;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router/*, private componentFactoryResolver: ComponentFactoryResolver*/) {
  }
  // ngOnInit() {
  //   this.userSub = this.authService.user.subscribe((user)=> this.user = user);
  // }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if (!form.valid) return;
    const {email, password} = form.value;
    let authObs: Observable<IAuthResponse>;
    this.isLoading = true;
    if (this.isLoginMode) {
     authObs = this.authService.signIn(email, password);
    } else {
     authObs = this.authService.signUp(email, password);
    }
    authObs.subscribe({
      next: (value) => {
      this.router.navigate(['/recipes'])
        this.isLoading = false;
      },
      error: (errorResponse) => {
        console.log(errorResponse);
        this.isLoading = false;
        this.error = errorResponse;
        this.showErrorAlert(errorResponse);
      },
      complete: () => {
        console.log('completed');
        this.isLoading = false;
      }
    })
    form.reset();
  }

  ngOnDestroy() {
    // this.userSub.unsubscribe();
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }


  // onCloseClicked(){
  //   this.error = null;
  // }

  private showErrorAlert(message: string) {
    // const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(AlertComponent);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.onClose.subscribe(()=> {
      this.closeSub.unsubscribe();
    hostViewContainerRef.clear();
    })
  }
}
