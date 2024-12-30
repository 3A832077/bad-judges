import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzListModule } from 'ng-zorro-antd/list';
import { CommonModule, formatDate } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { map, Observable } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

interface User {
  author: string;
  avatar: string;
}

interface Data extends User {
  id: number;
  isReplying: boolean;
  content: string;
  datetime: string;
  dislikes: number;
  likes: number;
  liked?: boolean;
  disliked?: boolean;
}

@Component({
    selector: 'app-detail',
    imports: [
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

  date = new Date();

  format = 'yyyy-MM-dd HH:mm:ss';

  formattedDate = formatDate(this.date, this.format, 'zh-TW');

  data:Data[] = [
    {
      id: 0,
      author: '定延',
      avatar: '2.jpg',
      content: 'strategy 真的很好聽仙曲!',
      isReplying: false,
      datetime: this.formattedDate,
      dislikes: 0,
      likes: 0,
      liked: false,
      disliked: false
    },
    {
      id: 1,
      author: '志效',
      avatar: '5.jpg',
      content: '根本是神專!',
      isReplying: false,
      datetime: this.formattedDate,
      dislikes: 0,
      likes: 0,
      liked: false,
      disliked: false
    }
  ];

  inputValue = '';

  datas: any = [];

  submitting = false;

  replyValue = '';

  constructor (
                private router: Router,
                private route: ActivatedRoute,
                private message: NzMessageService
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
      this.data[index].isReplying = !this.data[index].isReplying;
    }
  }

  /**
   * 提交留言
   */
  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    this.submitting = false;
    if (content === ''){
      this.message.create('warning', '請輸入留言內容');
    }
    else{
      this.data = [
      ...this.data,
      {
        author: this.info.name,
        avatar: this.info.pic,
        content,
        isReplying: false,
        id: this.data.length,
        datetime: this.formattedDate,
        dislikes: 0,
        likes: 0
      }];
    }
  }

  /**
   * 返回法官列表
   */
  goBack(): void {
    this.router.navigate(['/home']);
  }

  /**
   * 留言按讚
   * @param id
   * @param index
   */
  like(id: number, index: number): void {
    if (id === index) {
      if (this.data[id].liked) {
        this.data[id].likes -= 1;
        this.data[id].liked = false;
      }
      else {
          this.data[id].likes += 1;
          this.data[id].liked = true;
      }
    }
  }

  /**
   * 留言倒讚
   * @param id
   * @param index
   */
  dislike(id: number, index: number): void {
    if (id === index) {
      if (this.data[id].disliked) {
        this.data[id].dislikes -= 1;
        this.data[id].disliked = false;
      }
      else {
          this.data[id].dislikes += 1;
          this.data[id].disliked = true;
      }
    }
  }
}
