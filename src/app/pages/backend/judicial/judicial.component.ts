import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { JudicialService } from './judicial.service';
import { catchError, EMPTY, tap } from 'rxjs';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-judicial',
  imports: [
              NzTableModule, NzButtonModule, NzModalModule,
              NzDividerModule, NzInputModule, NzIconModule,
              CommonModule,
           ],
  templateUrl: './judicial.component.html',
  styleUrl: './judicial.component.css'
})
export class JudicialComponent implements OnInit {

  pageIndex : number = 1;

  pageSize : number = 10;

  total : number = 0;

  displayedList: any[] = [];

  loading = false;

  constructor(
                private modal: NzModalService,
                private message: NzMessageService,
                private judicialService: JudicialService
              ) {}

  ngOnInit(): void {
    this.getJudicial();
  }

  /**
   * 獲取法院列表
   */
  getJudicial(): void {
    this.loading = true;
    this.judicialService.getJudicials().pipe(
      tap((res: any) => {
        this.loading = false;
        this.displayedList = res.items;
      }),
      catchError((error: any) => {
        this.loading = false;
        this.displayedList = [];
        return EMPTY;
      })).subscribe(() => {
        this.loading = false;
    });
  }

  /**
   * 打開modal
   */
  openModal(): void {
    this.modal.create({
      nzTitle: '新增法院',
      nzContent: FormComponent,
      nzFooter: null,
      nzZIndex: 60,
      nzMaskClosable: false,
      nzCentered: true,
      nzClosable: false,
      nzWidth: '400px'
    });
  }

}
