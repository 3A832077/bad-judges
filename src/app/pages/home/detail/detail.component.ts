import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
  reply?: string;
  content: string;
  datetime: string;
  dislikes: number;
  likes: number;
  liked?: boolean;
  disliked?: boolean;
  children?: any[];
  replyValue?: string;
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

  gId: number = 0;

  format = 'yyyy-MM-dd HH:mm:ss';

  formattedDate = formatDate(this.date, this.format, 'zh-TW');

  data: Data[] = [
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
      disliked: false,
      children: [{
        id: 0,
        author: '匿名',
        avatar: 'https://example.com/avatar2.png',
        content: '我也覺得很好聽',
        datetime: '30 minutes ago',
        likes: 0,
        dislikes: 0,
        isReplying: false,
        children: [],
      }],
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

  constructor (
                private router: Router,
                private route: ActivatedRoute,
                private message: NzMessageService,
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
    // 取得路由參數
    this.currentState$ = this.route.paramMap.pipe(map(() => window.history.state.info.queryParams));
  }

  /**
   * 返回法官列表
   */
  goBack(): void {
    this.router.navigate(['/home']);
  }

  /**
   * 留言按讚或取消按讚
   * @param item
   */
  like(item: Data): void {
    if (item.liked) {
      item.likes--;
      item.liked = false;
    }
    else {
      item.likes++;
      item.liked = true;
    }
  }

  /**
   * 留言倒讚或取消倒讚
   * @param item
   */
  dislike(item: Data): void {
    if (item.disliked) {
      item.dislikes--;
      item.disliked = false;
    }
    else {
      item.dislikes++;
      item.disliked = true;
    }
  }

  /**
   * 取消/顯示回復框
   * @param item
   */
  showReply(item: Data): void {
    item.isReplying = !item.isReplying;
  }

  /**
   * 新增留言或回覆
   * @param item 當筆要回復的資料
   */
  handleComment(item?: any): void {
    if (!item && this.inputValue === '') {
      this.message.create('warning', '請輸入留言內容');
      return;
    }
    else{
      const comment = {
        id: item ? item.children.length : this.data.length,
        author: this.info.name,
        avatar: this.info.pic,
        content: item ? item.replyValue : this.inputValue,
        datetime: this.formattedDate,
        likes: 0,
        dislikes: 0,
        disliked: false,
        liked: false,
        isReplying: false,
        replyValue: '',
        children: []
      };
      if (item) {
        // 回覆
        item.children = [...item.children, comment];
        item.isReplying = false;
        item.replyValue = '';
      }
      else {
        // 新增留言
        this.data = [...this.data, comment];
        this.inputValue = '';
      }
    }
  }
}
