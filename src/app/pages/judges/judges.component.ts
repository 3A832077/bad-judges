import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPaginationModule  } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { catchError, EMPTY, filter, tap } from 'rxjs';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzListModule } from 'ng-zorro-antd/list';
import { JudgesService } from './judges.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-judges',
    imports: [
                NzCardModule, NzGridModule, NzAvatarModule,
                CommonModule, RouterOutlet, NzPaginationModule,
                NzInputModule, NzIconModule, FormsModule,
                ReactiveFormsModule, NzEmptyModule, NzListModule,
                RouterLink
             ],
    templateUrl: './judges.component.html',
    styleUrls: ['./judges.component.css']
})
export class JudgesComponent implements OnInit {

  selected: any = null;

  displayedList: any[] = [];

  form: FormGroup = new FormGroup({});

  pageSize: number = 10;

  total: number = 0;

  pageIndex: number = 1;

  loading = false;

  constructor (
                private router: Router,
                private judgesService: JudgesService,
                private cdr: ChangeDetectorRef
         ) {}

  ngOnInit() {
    // this.form = this.formBuilder.group({
    //   search: [null],
    // });

    // 監聽路由變化
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // 如果當前路由是 /home，重置 selectedItemId
      if (event.url === '/judges') {
        this.selected = null;
      }
    });
    this.getJudges();
  }

  /**
   * 點選詳細時，將 id 設定給 selectedId
   * @param event
   */
  onActivate(event: any) {
    this.selected = event;
    this.cdr.detectChanges();
  }

  getJudges(pageIndex: number = 1, pageSize: number = 10, filterEvent: any = null): void {
    const params: any = {
      page: pageIndex,
      size: pageSize
    };
    this.loading = true;

    this.judgesService.getJudges(params).pipe(
      tap((res) => {
        res.items.forEach((item: any) => {
          item.info = `法院: ${item.organizations}\n股別: ${item.divisions}\n法庭: ${item.departments}`;
        });
        this.displayedList = res.items;
        this.total = res.total;
        this.pageIndex = res.page;
        this.pageSize = pageSize;
      }),
      catchError((error) => {
        this.loading = false;
        this.displayedList = [];
        this.total = 0;
        return EMPTY;
      })).subscribe(() => {
        this.loading = false;
    });
  }



}
