import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  side_nav_open = false;

  // constructor() { }

  ngOnInit(): void {
    this.side_nav_open = false;
  }

}
