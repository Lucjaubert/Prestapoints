import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../model/category';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public tags?: Category[];

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit() {
    this.tagsSubscription();
  }

  tagsSubscription() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.tags = categories;
    });
  }

  navigateToCategoryDetails(categoryId: number) {
    this.router.navigate(['/categories', categoryId, 'prestations']);
  }
}
