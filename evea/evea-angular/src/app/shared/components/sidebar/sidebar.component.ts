import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  isExpanded = false;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.isExpanded = window.innerWidth <= screen.width / 2 || window.innerWidth <= 400 ? false : true;
  }

  constructor() {
    this.getScreenSize();
  }

  ngOnInit(): void {}
}
