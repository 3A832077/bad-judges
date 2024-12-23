import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFlexModule } from 'ng-zorro-antd/flex'

@Component({
    selector: 'app-personal',
    imports: [
        CommonModule, FormsModule, NzAvatarModule,
        NzCardModule, NzIconModule, NzButtonModule,
        NzDividerModule, NzGridModule, NzRadioModule,
        NzDatePickerModule, NzSwitchModule, ReactiveFormsModule,
        NzInputModule, NzFlexModule
    ],
    templateUrl: './personal.component.html',
    styleUrl: './personal.component.css'
})
export class PersonalComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
