import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  //route = new Router;

  restaurants = [
    {
      id: 1,
      name: "restaurant 1",
      picture: "https://www.vintageindustrialstyle.com/wp-content/uploads/2017/09/Industrial-Design-Style-Find-Out-This-Bar-Restaurant-in-Poland-2.jpg"
    },
    {
      id: 2,
      name: "restaurant 2",
      picture: "https://www.vintageindustrialstyle.com/wp-content/uploads/2017/09/Industrial-Design-Style-Find-Out-This-Bar-Restaurant-in-Poland-2.jpg"
    },
    {
      id: 3,
      name: "restaurant 3",
      picture: "https://www.vintageindustrialstyle.com/wp-content/uploads/2017/09/Industrial-Design-Style-Find-Out-This-Bar-Restaurant-in-Poland-2.jpg"
    }
  ]

  constructor() { }

  onClick()
  {
    console.log("click");

  }

  ngOnInit(): void {
  }

}
