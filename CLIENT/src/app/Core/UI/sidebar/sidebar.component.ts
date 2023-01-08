import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  sidebar_collapse: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  onSidebarCollapse() {
    this.sidebar_collapse = !this.sidebar_collapse
    console.log(this.sidebar_collapse)
  }

}
