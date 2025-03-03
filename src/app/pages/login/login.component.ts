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
    imports: [
               CommonModule, FormsModule, ReactiveFormsModule,
               NzInputModule, NzButtonModule, NzFormModule,
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
              ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true]
    });
  }


}
