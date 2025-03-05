import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { JudicialService } from '../../judicial/judicial.service';
import { JudgesService } from '../../../judges/judges.service';

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

  juicialList: any[] = [];

  departmentsArray: any[] = [];

  divisionsArray: any[] = [];

  constructor(
                private fb: FormBuilder,
                private modal: NzModalRef,
                private judicialService: JudicialService,
                private judgesService: JudgesService,
             ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      organizations: [this.data?.organization || null],
      name: [this.data?.name || null],
      array: this.fb.array([]),
    });
    this.addFields();
    this.getJudicials();
  }

  /**
   * 取得表單中的array
   */
  get array(): FormArray {
    return this.form.get('array') as FormArray;
  }

  /**
   * 提交表單
   */
  submitForm(): void {
    this.departmentsArray = [];
    this.divisionsArray = [];

    this.array.value.forEach((item: any) => {
      this.departmentsArray.push(item.departments);
      this.divisionsArray.push(item.divisions);
    });

    const params = {
      organization: this.form.value.organizations,
      name: this.form.value.name,
      departments: this.departmentsArray,
      divisions: this.divisionsArray,
    };

    this.judgesService.addJudge(params).subscribe((res) => {
      if (res){
        this.modal.close('success');
      }
    });
  }

  /**
   * 關閉modal
   */
  close(): void {
    this.modal.destroy();
  }

  /**
   * 新增欄位
   */
  addFields(): void {
    this.array.push(
      new FormGroup({
        departments: new FormControl(null),
        divisions: new FormControl(null),
      })
    );
  }

  /**
   * 移除欄位
   * @param index
   */
  removeFields(index: number): void {
    this.array.removeAt(index);
  }

  /**
   * 取得法院列表
   */
  getJudicials(): void {
    this.judicialService.getJudicials().subscribe((res: any) => {
      this.juicialList = res.items;
    });
  }

}
