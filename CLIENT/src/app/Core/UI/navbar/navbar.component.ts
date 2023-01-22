import { IUserLog } from './../../interfaces/account';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentUser$: Observable<IUserLog | null>;

  constructor(private fb: FormBuilder, private accountService: AccountService, private route: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$
  }

  profileForm: FormGroup = this.fb.group({
    userName: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required),
  });

  onLogIn() {
    this.accountService.logIn(this.profileForm.value).subscribe(res => {
      this.route.navigateByUrl("/users")
      this._snackBar.open("Welcome Back :)", 'Close', {
        duration: 3000
      })
        , (err: any) => {

          this._snackBar.open(err);

        }
    })
  }

  onLogOut() {
    this.accountService.logOut()
    this.route.navigateByUrl("/")

  }




}
