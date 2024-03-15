import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private stateService: StateService) {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.maxLength(100)]],
      password: [null, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.httpClient.post('http://localhost:5081/api/auth/login', this.loginForm.value)
        .subscribe((data: any) => {
          localStorage['token'] = data.token;
          localStorage['username'] = data.username;
          localStorage['expireDate'] = data.expireDate;

          this.stateService.userData.next({
            token: data.token,
            username: data.username,
            expireDate: new Date(data.expireDate)
          });
        }, error => console.log(error?.error));

      //this.loginForm.reset();
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
