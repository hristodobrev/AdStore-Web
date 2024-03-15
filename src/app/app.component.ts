import { Component, OnInit } from '@angular/core';
import { StateService } from './state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AdStore-Web';

  constructor(public stateService: StateService) {}

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('username');
    let expireDate = new Date(localStorage.getItem('expireDate') ?? '');
      if(token && username && expireDate) {
        this.stateService.userData.next({
          token,
          username,
          expireDate
        });
      }
  }

  logout() {
    this.stateService.userData.next(null);
    localStorage.clear();
  }
}
