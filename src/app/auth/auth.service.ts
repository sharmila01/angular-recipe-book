import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {IAuthResponse} from "./auth.types";
import {catchError, throwError, Subject, tap, BehaviorSubject} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user = new BehaviorSubject<User>(null);
  private logoutTimer: any;
constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
   return this.http.post<IAuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYhBWo3NwAaOK3LFgcO1SctvTAw082GiY',
     {
       email: email,
       password: password,
       returnSecureToken: true
     })
     .pipe(catchError(this.handleErrorResponse), tap((resData) => {
       this.handleUserAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
     }));
  }

  signIn(email: string, password: string) {
    return this.http.post<IAuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYhBWo3NwAaOK3LFgcO1SctvTAw082GiY',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(this.handleErrorResponse), tap(resData => {
        this.handleUserAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      }));
  }

  autoSignIn() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
  if (!userData) {
    return;
  }
  const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
  if (loadedUser.token) {
    this.user.next(loadedUser);
    const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
    this.autoLogout(expirationDuration);
  }
  }

 autoLogout(expirationDuration: number) {
  console.log(expirationDuration);
   this.logoutTimer = setTimeout(() => {
     // console.log('In timer', expirationDuration)
      this.logOut();
    }, expirationDuration)
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.logoutTimer = null;
  }

  private handleUserAuthentication(email: string, id: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleErrorResponse(errorResponse: HttpErrorResponse) {
    let errorMessage = 'Some error occurred...';
    if(!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Signup with email/password is disabled';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Attempts limit is reached. Try again later';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'User email not found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password not valid';
        break;
      case 'USER_DISABLED':
        errorMessage = 'Account is disabled';
        break;
      default:
        errorMessage = errorResponse.error.error.message;
    }
    return throwError(() => new Error(errorMessage));
  }
}
