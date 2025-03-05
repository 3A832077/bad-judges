import { Component, inject, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { FormService } from './form.service';

@Component({
  selector: 'judicial-form',
  imports: [
              NzFormModule, CommonModule, FormsModule,
              ReactiveFormsModule, NzButtonModule, NzInputModule,
              NzIconModule, NzDividerModule,
           ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{

  form: FormGroup = new FormGroup({});

  data = inject(NZ_MODAL_DATA) || undefined;

  constructor(
                private fb: FormBuilder,
                private modal: NzModalRef,
                private formService: FormService,
             ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.data?.name || null],
    });
  }

  submitForm(): void {
    const params = { ...this.form.value };
    this.formService.addJudicial(params).subscribe((res: any) => {
      if (res){
        this.modal.close('success');
      }
    });
  }

  close(): void {
    this.modal.destroy();
  }

}
