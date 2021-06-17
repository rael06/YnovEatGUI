import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private _router: Router) {
    this.navLinks = [
      {
        label: 'Orders',
        link: '/back-office/orders',
        index: 0
      }, {
        label: 'Products',
        link: '/back-office/products',
        index: 1
      }, {
        label: 'Restaurant info',
        link: '/back-office/restaurant-info',
        index: 2
      },
    ];
  }

  ngOnInit(): void {
    this._router.events.subscribe(() => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find(tab => tab.link === '.' + this._router.url)
      );
    });
  }

}
