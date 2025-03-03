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

@Component({
  selector: 'app-judicial',
  imports: [
              NzTableModule, NzButtonModule, NzModalModule,
              NzDividerModule, NzFormModule, NzInputModule,
              FormsModule, ReactiveFormsModule, NzIconModule,
              CommonModule, NzLayoutModule
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
    private message: NzMessageService
  ) {}

  ngOnInit(): void {

  }

  getJudicial(): void {
  }

}
