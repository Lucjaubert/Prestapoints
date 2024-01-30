import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewscardComponent } from './reviewscard.component';

describe('ReviewscardComponent', () => {
  let component: ReviewscardComponent;
  let fixture: ComponentFixture<ReviewscardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewscardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewscardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
