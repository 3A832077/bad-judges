import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPaginationModule  } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzListModule } from 'ng-zorro-antd/list';

type List = {
  id: number;
  name: string;
  description: string;
  avatarUrl: string;
};

@Component({
    selector: 'app-home',
    imports: [
        NzCardModule, NzGridModule, NzAvatarModule,
        CommonModule, RouterLink, RouterOutlet,
        NzPaginationModule, NzInputModule, NzIconModule,
        FormsModule, ReactiveFormsModule, NzEmptyModule,
        NzListModule
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lists: List[] = [
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
      name: 'dinotaeng',
      description: '短尾矮袋鼠',
      avatarUrl: '10.jpg'
    },
    {
      id: 11,
      name: '泳知',
      description: '高等rapper3 冠軍',
      avatarUrl: '11.jpg'
    },
    {
      id: 12,
      name: 'yoasobi',
      description: '我推的idol',
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
      description: '是獅子不是熊😡',
      avatarUrl: '15.jpg'
    },
    {
      id: 16,
      name: '熊老闆商會員工',
      description: '金麟片拿來!!',
      avatarUrl: '16.jpg'
    }
  ];

  selectedId: string | null = null;

  displayedList: any[] = this.lists;

  filteredLists: any[] = [];

  form: FormGroup = new FormGroup({});

  pageSize: number = 24;

  totalPages: number = this.displayedList.length / this.pageSize;

  total: number = this.displayedList.length;

  currentPage: number = 1;

  constructor (
                private router: Router,
                private formBuilder: FormBuilder
         ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      search: [null],
    });

    this.totalPages = Math.ceil(this.lists.length / 12);
    this.filteredLists = this.lists;
    this.updateDisplayedList();

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

  /**
   * 點選卡片時，導向詳細頁面
   * @param id
   * @param name
   * @param detail
   * @param pic
   */
  toMessageBoard(id: number, name: string, detail: string, pic: string): void {
    this.router.navigateByUrl('/home/detail/'+ id , {
      state: { info: { name: name, detail: detail, pic: pic } },
    });
  }

  /**
   * 點選詳細時，將 id 設定給 selectedId
   * @param event
   */
  onActivate(event: any) {
    this.selectedId = event;
  }

  /**
   * 換頁
   * @param index
   * @returns
   */
  pageChange(index: number, size: number): void {
    // 邊界檢查
    if (index < 1 || index > this.totalPages) {
      return;
    }
    // 更新當前頁碼
    this.currentPage = index;
    this.pageSize = size;

    // 計算顯示的列表範圍
    const startIndex = (index - 1) * size;
    const endIndex = Math.min(index * size, this.lists.length);
    // 更新顯示的列表
    this.displayedList = this.lists.slice(startIndex, endIndex);
  }

  /**
   * 按下enter搜尋列表
   * @param event
   */
  searchList(event: any): any {
    if (event.key === 'Enter') {
      const searchTerm = event.target.value.trim();
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = Math.min(startIndex + this.pageSize, this.lists.length);
      const currentPageItems = this.lists.slice(startIndex, endIndex);

      if (searchTerm === '') {
        this.filteredLists = currentPageItems;
      }
      else {
        this.filteredLists = currentPageItems.filter((item) =>
          item.name.indexOf(searchTerm) !== -1
        );
      }
      this.updateDisplayedList();
    }
  }

  /**
   *根據當前頁碼和已篩選的列表，更新顯示的列表
  */
  updateDisplayedList() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.filteredLists.length);
    this.displayedList = this.filteredLists.slice(startIndex, endIndex);
  }

}
