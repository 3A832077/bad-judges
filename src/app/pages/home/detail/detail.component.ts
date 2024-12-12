import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzListModule } from 'ng-zorro-antd/list';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { map, Observable } from 'rxjs';
import { addDays, formatDistance } from 'date-fns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface User {
  author: string;
  avatar: string;
}

interface Data extends User {
  id: number;
  isReplying: boolean;
  content: string;
  datetime: string;
}

@Component({
  selector: 'app-detail',
  standalone: true,
  imports:[
            NzGridModule, NzAvatarModule, NzCommentModule,
            NzListModule, CommonModule, NzCardModule,
            NzFormModule, NzInputModule, NzButtonModule,
            NzPageHeaderModule, NzIconModule, NzToolTipModule,
            NzDividerModule, FormsModule, ReactiveFormsModule
          ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

  @Input() id = '';

  currentState$: Observable<any> | undefined;

  info: any = {}

  time = formatDistance(new Date(), new Date());

  data:Data[] = [
    {
      id: 0,
      author: '定延',
      avatar: '2.jpg',
      content: 'strategy 真的很好聽仙曲!',
      isReplying: false,
      datetime: formatDistance(new Date(), addDays(new Date(), 1)),
    },
    {
      id: 1,
      author: '志效',
      avatar: '5.jpg',
      content: '根本是神專!',
      isReplying: false,
      datetime: formatDistance(new Date(), addDays(new Date(), 2))
    }
  ];

  inputValue = '';

  datas: any = [];

  submitting = false;

  user: User = {
    author: '子瑜',
    avatar: '9.jpg'
  };

  constructor (
                private router: Router,
                private route: ActivatedRoute,
              ){
                const navigationInfo = this.router.getCurrentNavigation()?.extras?.state?.['info'];
                if (navigationInfo) {
                  this.info = navigationInfo;
                  localStorage.setItem('info', JSON.stringify(this.info));
                }
                else {
                // 如果是刷新頁面，從 localStorage 中取資料
                const storedInfo = localStorage.getItem('info');
                if (storedInfo) {
                  this.info = JSON.parse(storedInfo);
                }
              }
            }

  ngOnInit(): void {
    this.currentState$ = this.route.paramMap.pipe(
      map(() => window.history.state.info.queryParams)
    );
  }

  /**
   * 顯示回復框
   * @param id
   * @param index
   */
  showReply(id: number, index: number): void {
    if (id === index) {
      this.data[index].isReplying = true;
    }
  }

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      this.data = [
        ...this.data,
        {
          ...this.user,
          content,
          isReplying: false,
          id: this.data.length + 1,
          datetime: formatDistance(new Date(), addDays(new Date(), 2))
        }
      ].map(e => ({
        ...e,
        datetime: formatDistance(new Date(), addDays(new Date(), 2))
      }));
    }, 800);
  }
}
