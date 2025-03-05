import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private http: HttpClient
  ) { }

  mainUrl = `${environment.apiUrl}/courts`;

  /**
   * 新增法院
   * @param params
   */
  addJudicial(params: any): Observable<any> {
    return this.http.post(this.mainUrl, params);
  }


}
