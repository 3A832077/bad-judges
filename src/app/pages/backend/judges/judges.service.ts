import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JudgesService {

  constructor(
    private http: HttpClient
  ) { }

  mainUrl = `${environment.apiUrl}/judges`;

  /**
   * 取得所有法官
   */
  getJudges(params: any): Observable<any> {
    return this.http.get(this.mainUrl, { params });
  }
}
