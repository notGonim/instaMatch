import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {



  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  profileForm: FormGroup = this.fb.group({
    userName: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required),
  });

  onLogIn() {
    console.log("Form Values : ", this.profileForm.value)
  }



}
