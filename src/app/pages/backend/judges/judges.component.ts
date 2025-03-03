import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { JudgesService } from './judges.service';
import { catchError, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'backend-judges',
  imports: [
              NzTableModule, NzButtonModule, NzModalModule,
              NzDividerModule, NzFormModule, NzInputModule,
              FormsModule, ReactiveFormsModule, NzIconModule,
              CommonModule, NzLayoutModule
            ],
  templateUrl: './judges.component.html',
  styleUrl: './judges.component.css'
})
export class JudgesComponent implements OnInit {

  pageIndex : number = 1;

  pageSize : number = 10;

  total : number = 0;

  displayedList: any[] = [];

  loading = false;

  constructor(
                private modal: NzModalService,
                private message: NzMessageService,
                private judgesService: JudgesService
              ) {}

  ngOnInit(): void {
    this.getJudges();
  }

  /**
   * 獲取法官列表
   * @param pageIndex
   * @param pageSize
   * @param filterEvent
   */
  getJudges(pageIndex: number = 1, pageSize: number = 10, filterEvent: any = null): void {
    const params: any = {
      page: pageIndex,
      size: pageSize
    };
    this.loading = true;

    this.judgesService.getJudges(params).pipe(
      tap((res) => {
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
