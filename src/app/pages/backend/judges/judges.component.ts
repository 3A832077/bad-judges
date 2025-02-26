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

@Component({
  selector: 'app-judges',
  imports: [
              NzTableModule, NzButtonModule, NzModalModule,
              NzDividerModule, NzFormModule, NzInputModule,
              FormsModule, ReactiveFormsModule, NzIconModule,
              CommonModule
            ],
  templateUrl: './judges.component.html',
  styleUrl: './judges.component.css'
})
export class JudgesComponent implements OnInit {

  constructor(
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {

  }

  


}
