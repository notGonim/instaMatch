import { IUserLog } from './../../interfaces/account';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentUser$: Observable<IUserLog | null>;

  constructor(private fb: FormBuilder, private accountService: AccountService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$
  }

  profileForm: FormGroup = this.fb.group({
    userName: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required),
  });

  onLogIn() {
    this.accountService.logIn(this.profileForm.value).subscribe(res => {
      console.log(res)
        , (err: any) => {
          console.log(err)
        }
    })
  }

  onLogOut() {
    this.accountService.logOut()
  }




}
