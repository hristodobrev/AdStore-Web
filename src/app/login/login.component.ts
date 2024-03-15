import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../state.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private stateService: StateService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.maxLength(100)]],
      password: [null, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.dataService.post('api/auth/login', this.loginForm.value)
        .subscribe((data: any) => {
          localStorage['token'] = data.token;
          localStorage['username'] = data.username;
          localStorage['expireDate'] = data.expireDate;

          this.stateService.userData.next({
            token: data.token,
            username: data.username,
            expireDate: new Date(data.expireDate)
          });

          this.router.navigate(['categories']);
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
