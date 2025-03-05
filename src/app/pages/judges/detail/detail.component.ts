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
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { catchError, of, tap } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { JudgesService } from '../judges.service';

@Component({
    selector: 'app-detail',
    imports: [
              NzGridModule, NzAvatarModule, NzCommentModule,
              NzListModule, CommonModule, NzCardModule,
              NzFormModule, NzInputModule, NzButtonModule,
              NzPageHeaderModule, NzIconModule, NzToolTipModule,
              NzDividerModule, FormsModule, ReactiveFormsModule,
              NzDescriptionsModule, NzSpaceModule, NzStatisticModule
            ],
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

  @Input() id = '';

  date = new Date();

  format = 'yyyy-MM-dd HH:mm:ss';

  formattedDate = formatDate(this.date, this.format, 'zh-TW');

  data: any = {};

  inputValue = '';

  commentList: any[] = [];

  submitting = false;

  pageIndex: number = 1;

  pageSize: number = 10;

  total: number = 0;

  constructor (
                private router: Router,
                private route: ActivatedRoute,
                private message: NzMessageService,
                private judgesService: JudgesService,
              ){}

  ngOnInit(): void {
    this.getJudge();
  }

  getJudge(): void {
    this.judgesService.getJudge(this.id).pipe(
      tap(res => {
        this.data = res;
      }),
      catchError(error => {
        return of(null);
      })
    ).subscribe(() =>
      this.getComments()
    );
  }

  getComments(pageIndex: number = 1, pageSize: number = 10, filterFn: any = null): void {
    const params = {
      name: this.data.name,
      page: pageIndex,
      size: pageSize,
      order: 'ASC'
    }

    this.judgesService.getComments(this.id, params).pipe(
      tap(res => {
        res.items.forEach((item: any) => {
          item.created = formatDate(item.created, this.format, 'zh-TW');
        })
        this.commentList = res;
        this.total = res.total;
        this.pageIndex = res.page;
        this.pageSize = pageSize;
      }),
      catchError(error => {
        this.commentList = [];
        this.total = 0;
        return of(null);
      })
    ).subscribe();
  }

  /**
   * 返回法官列表
   */
  goBack(): void {
    this.router.navigate(['/judges']);
  }

  /**
   * 留言按讚或取消按讚
   * @param item
   */
  // like(item: Data): void {
  //   if (item.liked) {
  //     item.likes--;
  //     item.liked = false;
  //   }
  //   else {
  //     item.likes++;
  //     item.liked = true;
  //   }
  // }

  /**
   * 留言倒讚或取消倒讚
   * @param item
   */
  // dislike(item: Data): void {
  //   if (item.disliked) {
  //     item.dislikes--;
  //     item.disliked = false;
  //   }
  //   else {
  //     item.dislikes++;
  //     item.disliked = true;
  //   }
  // }

  /**
   * 取消/顯示回復框
   * @param item
   */
  // showReply(item: Data): void {
  //   item.isReplying = !item.isReplying;
  // }

  /**
   * 新增留言或回覆
   * @param item 當筆要回復的資料
   */
  handleComment(item?: any): void {
    // if (!item && this.inputValue === '') {
    //   this.message.create('warning', '請輸入留言內容');
    //   return;
    // }
    // else{
    //   const comment = {
    //     id: item ? item.children.length : this.data.length,
    //     author: this.info.name,
    //     avatar: this.info.pic,
    //     content: item ? item.replyValue : this.inputValue,
    //     datetime: this.formattedDate,
    //     likes: 0,
    //     dislikes: 0,
    //     disliked: false,
    //     liked: false,
    //     isReplying: false,
    //     replyValue: '',
    //     children: []
    //   };
    //   if (item) {
    //     // 回覆
    //     item.children = [...item.children, comment];
    //     item.isReplying = false;
    //     item.replyValue = '';
    //   }
    //   else {
    //     // 新增留言
    //     this.data = [...this.data, comment];
    //     this.inputValue = '';
    //   }
    // }
  }
}
