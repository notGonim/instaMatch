import { Component, OnInit } from '@angular/core';
import { IUserLog } from './Core/interfaces/account';
import { AccountService } from './Core/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {



  ngOnInit(): void {
    this.setCurrentUser()
  }

  constructor(private userAccount: AccountService) {


  }

  setCurrentUser() {
    const user: IUserLog = JSON.parse(localStorage.getItem('userLog')!);
    this.userAccount.setUser(user)
  }

}
