import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/Core/services/account.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  mode: any = {}
  @Output() cancelRegistered = new EventEmitter<boolean>();


  constructor(private fb: FormBuilder, private accService: AccountService) { }

  ngOnInit(): void {
  }

  registerForm: FormGroup = this.fb.group({
    userName: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required),
  });

  formRegister() {
    console.log("Registered", this.registerForm.value)
    this.accService.signUp(this.registerForm.value).subscribe(res => {
      console.log("res: ", res)
      this.cancel();
    }, error => {
      console.log("error :", error)
    }
    )
  }

  cancel() {
    this.cancelRegistered.emit(false)
  }

}
