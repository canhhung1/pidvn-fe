import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private httpClient: HttpClient) {}
  private baseUrl = environment.baseUrl;

  getDynamicReport(dept: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Administrator/Menu/Report?dept=${dept}`);
  }

  getSections(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Administrator/Menu/Sections`);
  }
}
