import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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

  /**
   * 取得單一法官
   * @param name
   */
  getJudge(name: any): Observable<any> {
    return this.http.get(`${this.mainUrl}/${name}`);
  }

  /**
   * 新增法官
   * @param params
   */
  addJudge(params: any): Observable<any> {
    return this.http.post(this.mainUrl, params);
  }

  /**
   * 獲取法官所有評論
   * @param name
   */
  getComments(name: any, params: any): Observable<any> {
    return this.http.get(`${this.mainUrl}/${name}/comments`, { params });
  }

  /**
   * 新增法官評論
   * @param params
   */
  addComment(name: any, params: any): Observable<any> {
    return this.http.post(`${this.mainUrl}/${name}/comments`, params);
  }

}
