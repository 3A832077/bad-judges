import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {

  id: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // 取得動態參數 :id
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
