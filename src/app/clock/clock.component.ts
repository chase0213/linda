import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      const date = new Date();
      this.now = date.toLocaleTimeString('en-US');
      this.today = date.toLocaleDateString('en-US');
    }, 1000);
  }

  now:string;
  today:string;

}
