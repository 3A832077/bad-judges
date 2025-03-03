import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterLink, RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-backend',
  imports: [
              CommonModule, NzIconModule, NzLayoutModule,
              NzMenuModule, RouterLink, RouterOutlet
           ],
  templateUrl: './backend.component.html',
  styleUrl: './backend.component.css'
})
export class BackendComponent implements OnInit {

  isCollapsed = false;

  constructor(
                private router: Router
             ) {}

  ngOnInit() {

  }

  /**
   * 僅當前路徑完全相等時返回 true
   * @param url
   * @returns
   */
  isActive(url: string): boolean {
    return this.router.url.startsWith(url);
  }

}
