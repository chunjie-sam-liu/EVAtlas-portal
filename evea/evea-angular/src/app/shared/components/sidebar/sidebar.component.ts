import { Component, OnInit, HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  isExpanded = false;
  public assets = environment.assets;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.isExpanded = window.innerWidth <= (screen.width * 4) / 5 || window.innerWidth <= 800 ? false : true;
  }

  constructor() {
    this.getScreenSize();
  }

  ngOnInit(): void {}
}
