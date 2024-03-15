import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent {
  categoryForm: FormGroup;
  categoryId?: number;
  category: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.categoryId = +this.route.snapshot.params['id'];
    this.loadCategory();
  }

  loadCategory() {
    this.dataService.get('api/category/' + this.categoryId).subscribe(category => {
      this.category = category;
      this.categoryForm.patchValue({
        name: this.category.name,
        ratingGained: this.category.ratingGained,
        requiredRating: this.category.requiredRating,
        isRequiringPremium: this.category.isRequiringPremium
      });
    });
  }

  saveChanges() {
    if (this.categoryForm.valid) {
      const updatedCategory = {
        id: this.categoryId,
        name: this.categoryForm.value.name,
        ratingGained: this.categoryForm.value.ratingGained,
        requiredRating: this.categoryForm.value.requiredRating,
        isRequiringPremium: this.categoryForm.value.isRequiringPremium
      };
      this.dataService.put('api/category', updatedCategory).subscribe(() => {
        this.router.navigate(['/categories']);
      });
    }
  }
}
