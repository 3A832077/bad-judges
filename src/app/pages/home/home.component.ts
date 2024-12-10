import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [NzCardModule, NzGridModule, NzAvatarModule, CommonModule, RouterLink, RouterOutlet],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lists: any = [
    {
      id: 1,
      name: '娜璉',
      description: '領唱、領舞',
      avatarUrl: '1.jpg'
    },
    {
      id: 2,
      name: '定延',
      description: '領唱',
      avatarUrl: '2.jpg'
    },
    {
      id: 3,
      name: 'momo',
      description: '主舞、副唱、副Rapper',
      avatarUrl: '3.jpg'
    },
    {
      id: 4,
      name: 'Sana',
      description: '副唱',
      avatarUrl: '4.jpg'
    },
    {
      id: 5,
      name: '志效',
      description: '隊長、主唱',
      avatarUrl: '5.jpg'
    },
    {
      id: 6,
      name: 'mina',
      description: '主舞、副唱',
      avatarUrl: '6.jpg'
    },
    {
      id: 7,
      name: '多賢',
      description: '領Rapper、副唱',
      avatarUrl: '7.jpg'
    },
    {
      id: 8,
      name: '彩瑛',
      description: '主Rapper、副唱',
      avatarUrl: '8.jpg'
    },
    {
      id: 9,
      name: '子瑜',
      description: '領舞、副唱、忙內、門面',
      avatarUrl: '9.jpg'
    },
    {
      id: 10,
      name: 'dinoateng',
      description: '和BOBO是好朋友',
      avatarUrl: '10.jpg'
    },
    {
      id: 11,
      name: '茱蒂',
      description: '電馭叛客2077',
      avatarUrl: '11.jpg'
    },
    {
      id: 12,
      name: '那孩子',
      description: 'chiikawa',
      avatarUrl: '12.jpg'
    },
    {
      id: 13,
      name: '師薩',
      description: 'ENFJ',
      avatarUrl: '13.jpg'
    },
    {
      id: 14,
      name: '烏薩奇',
      description: 'ESTP',
      avatarUrl: '14.jpg'
    },
    {
      id: 15,
      name: '萊恩',
      description: 'KAKAO FRIENDS',
      avatarUrl: '15.jpg'
    },
    {
      id: 16,
      name: '熊老闆商會員工',
      description: '超累打工==',
      avatarUrl: '16.jpg'
    }
  ];

  selectedId: string | null = null;

  constructor(private router: Router) { }

  ngOnInit() {
    // 監聽路由變化
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // 如果當前路由是 /home，重置 selectedItemId
      if (event.url === '/home') {
        this.selectedId = null;
      }
    });
  }

  toMessageBoard(id: number): void {
    this.router.navigate(['/home/detail', id]);
  }

  onActivate(event: any) {
    // 當子路由被啟動時的處理邏輯
    this.selectedId = event;
  }

}
