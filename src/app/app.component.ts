import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
    selector: 'app-root',
    imports: [
              CommonModule, RouterLink, RouterOutlet,
              NzIconModule, NzLayoutModule, NzMenuModule,
              NzCardModule, NzDividerModule
            ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

  isCollapsed = false;

  constructor (
               private router: Router
              ) { }
  /**
   * 僅當前路徑完全相等時返回 true
   * @param url
   * @returns
   */
  isActive(url: string): boolean {
    return this.router.url === url;
  }

}
