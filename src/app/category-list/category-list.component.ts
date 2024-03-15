import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  categories?: any;
  displayedColumns: string[] = ['id', 'name', 'ratingGained', 'requiredRating', 'isRequiringPremium', 'dateCreated'];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.dataService.get('api/category').subscribe((categories: any) => {
      this.categories = categories;
    });
  }
}
