import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { SiderService } from '../../service/sider.service';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-backend',
  imports: [
              CommonModule, NzIconModule, NzLayoutModule,
              NzMenuModule, RouterLink, RouterOutlet,
              NzToolTipModule
           ],
  templateUrl: './backend.component.html',
  styleUrl: './backend.component.css'
})
export class BackendComponent implements OnInit {

  isCollapsed = false;

  siderSubscripion!: Subscription;

  constructor(
                private router: Router,
                private siderService: SiderService
             ) {}

  ngOnInit() {
    this.siderSubscripion = this.siderService.collapsed$.subscribe((state: boolean) => {
      this.isCollapsed = state;
    });
  }

  ngOnDestroy(): void {
    this.siderSubscripion.unsubscribe();
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
