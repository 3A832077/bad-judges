import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiderService {

  private collapsed = new BehaviorSubject<boolean>(true);
  collapsed$ = this.collapsed.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // 只在瀏覽器端執行這段程式
      this.collapsed.next(window.innerWidth < 768);
      window.addEventListener('resize', this.onResize.bind(this));
    }
  }

  toggleSidebar(): void {
    this.collapsed.next(!this.collapsed.value);
  }

  setSidebar(state: boolean): void {
    this.collapsed.next(state);
  }

  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.collapsed.next(window.innerWidth < 768);
    }
  }
}
