import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {
    this.registerForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.maxLength(100)]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      firstName: [null, [Validators.maxLength(100)]],
      lastName: [null, [Validators.maxLength(100)]],
      age: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      town: [null, [Validators.maxLength(50)]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.httpClient.post('http://localhost:5081/api/auth/register', this.registerForm.value)
        .subscribe(console.log);

      this.registerForm.reset();
    } else {
      this.markFormGroupTouched(this.registerForm);
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

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl?.value !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }
}
