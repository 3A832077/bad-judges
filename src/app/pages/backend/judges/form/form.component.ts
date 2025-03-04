import { Component, inject, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'judges-form',
  imports: [
              NzFormModule, CommonModule, FormsModule,
              ReactiveFormsModule, NzButtonModule, NzInputModule,
              NzIconModule, NzDividerModule, NzSelectModule,
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
             ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      organization: [this.data?.organization || null],
      name: [this.data?.name || null],
      array: this.fb.array([]),
    });
    this.addFields();
  }

  get array(): FormArray {
    return this.form.get('array') as FormArray;
  }

  submitForm(): void {

  }

  close(): void {
    this.modal.destroy();
  }

  addFields(): void {
    this.array.push(
      new FormGroup({
        department: new FormControl(null),
        division: new FormControl(null),
      })
    );
  }

  removeFields(index: number): void {
    this.array.removeAt(index);
  }

}
