import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { IAccount, IUserLog } from '../interfaces/account';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = 'https://localhost:7068/api/'
  private currentUserSource = new ReplaySubject<IUserLog | null>(1);
  currentUser$ = this.currentUserSource.asObservable()

  constructor(private http: HttpClient) { }

  logIn(model: IAccount) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((res: any) => {
        console.log("response: ", res)
        const userLog = res
        if (userLog) {
          localStorage.setItem('userLog', JSON.stringify(userLog))
          this.currentUserSource.next(userLog)
        }
      })
    )
  }

  signUp(model: IAccount) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user:any) => {
        console.log("response: ", user)
        if (user) {
          localStorage.setItem('userLog', JSON.stringify(user))
          this.currentUserSource.next(user)
        }
      })
    )
  }

  setUser(userLog: IUserLog) {
    this.currentUserSource.next(userLog)
  }

  logOut() {
    localStorage.removeItem('userLog')
    this.currentUserSource.next(null)
  }


}
