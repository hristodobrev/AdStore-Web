import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent {
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      ratingGained: [0, [Validators.required, Validators.min(0)]],
      requiredRating: [0, [Validators.required, Validators.min(0)]],
      isRequiringPremium: [false, Validators.required]
    });
  }

  saveCategory() {
    if (this.categoryForm.valid) {
      const newCategory = {
        name: this.categoryForm.value.name,
        ratingGained: this.categoryForm.value.ratingGained,
        requiredRating: this.categoryForm.value.requiredRating,
        isRequiringPremium: this.categoryForm.value.isRequiringPremium
      };
      this.dataService.post('api/category', newCategory).subscribe(() => {
        this.router.navigate(['/categories']);
      });
    }
  }
}
