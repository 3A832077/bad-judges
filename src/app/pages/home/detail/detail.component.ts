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
import { map, Observable } from 'rxjs';
import { addDays, formatDistance } from 'date-fns';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports:[
            NzGridModule, NzAvatarModule, NzCommentModule,
            NzListModule, CommonModule, NzCardModule,
            NzFormModule, NzInputModule, NzButtonModule,
            NzPageHeaderModule, NzIconModule, NzToolTipModule
          ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

  @Input() id = '';

  currentState$: Observable<any> | undefined;

  info: any = {}

  likes = 0;
  dislikes = 0;
  time = formatDistance(new Date(), new Date());

  data = [
    {
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      datetime: formatDistance(new Date(), addDays(new Date(), 1))
    },
    {
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      datetime: formatDistance(new Date(), addDays(new Date(), 2))
    }
  ];

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

  like(): void {
    this.likes = 1;
    this.dislikes = 0;
  }

  dislike(): void {
    this.likes = 0;
    this.dislikes = 1;
  }

}
