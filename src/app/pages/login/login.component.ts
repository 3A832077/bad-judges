import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            NzInputModule,
            NzButtonModule,
            NzFormModule,
            NzCheckboxModule
           ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({});


  constructor(
              private fb: FormBuilder,
              private router: Router,
              private message: NzMessageService
            ) {
              }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    // if (this.form.valid) {
    //   // 模擬登入邏輯
    //   const { email, password } = this.form.value;

    //   // 簡單的登入驗證（實際應用中應使用後端服務）
    //   if (email === 'admin' && password === '12345678') {
    //     this.message.success('登入成功');
    //     this.router.navigate(['/home']);
    //   }
    //   else {
    //     this.message.error('帳號或密碼錯誤');
    //   }
    // }
    // else {
    //   Object.values(this.form.controls).forEach(control => {
    //     if (control.invalid) {
    //       control.markAsDirty();
    //       control.updateValueAndValidity({ onlySelf: true });
    //     }
    //   });
    // }
  }

}
