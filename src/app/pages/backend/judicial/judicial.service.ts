import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JudicialService {

  constructor(
    private http: HttpClient
  ) { }

  mainUrl = `${environment.apiUrl}/courts`;

  /**
   * 取得所有法院
   */
  getJudicials(): Observable<any> {
    return this.http.get(this.mainUrl);
  }


}
