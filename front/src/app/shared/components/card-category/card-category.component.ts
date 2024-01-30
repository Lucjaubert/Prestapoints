import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card-category',
  templateUrl: './card-category.component.html',
  styleUrls: ['./card-category.component.scss']
})
export class CardCategoryComponent {

  selectedCategory: any;
  @Input() category: any;

  constructor(private router: Router) { }

  openCategoryDetails() {
    if (this.category && this.category.id) {
      this.selectedCategory = this.category;
      this.router.navigate(['/categories', this.category.id, 'prestations']);
    }
  }
}
