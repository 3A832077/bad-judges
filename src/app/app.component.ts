import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalService, NzModalModule } from 'ng-zorro-antd/modal';
import { LoginComponent } from './pages/login/login.component';
import { SiderService } from './service/sider.service';

@Component({
  selector: 'app-root',
  providers: [NzModalService],
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzCardModule,
    NzDividerModule,
    NzButtonModule,
    NzModalModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private modalService: NzModalService,
    public siderService: SiderService
  ) {}

  ngOnInit() {}

  /**
   * 僅當前路徑完全相等時返回 true
   * @param url
   * @returns
   */
  isActive(url: string): boolean {
    return this.router.url.startsWith(url);
  }

  /**
   * 打開登入modal
   */
  openModal(): void {
    this.modalService.create({
      nzContent: LoginComponent,
      nzFooter: null,
      nzZIndex: 2,
      nzMaskClosable: false,
    });
  }
}
