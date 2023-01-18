import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  registerMode: boolean = false
  constructor() { }

  ngOnInit(): void {
  }


  registerToggle() {
    this.registerMode = !this.registerMode
  }

  cancelRegisteredMode(e: any) {
    this.registerMode = e
  }

}
