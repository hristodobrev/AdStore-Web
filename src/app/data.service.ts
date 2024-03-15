import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {
  private subscription;
  private apiUrl = 'http://localhost:5081/';
  private token: any = null;

  constructor(private http: HttpClient, private stateService: StateService) {
    this.subscription = this.stateService.userData.subscribe(userData => {
      if (userData)
        this.token = userData.token;
      else
        this.token = null;  
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  get(url: string) {
    return this.http.get(`${this.apiUrl}${url}`, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  post(url: string, data: any) {
    return this.http.post(`${this.apiUrl}${url}`, data, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  put(url: string, data: any) {
    return this.http.put(`${this.apiUrl}${url}`, data, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }
}
