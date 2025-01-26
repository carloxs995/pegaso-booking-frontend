import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCreationComponent } from './booking-creation.component';

describe('BookingCreationComponent', () => {
  let component: BookingCreationComponent;
  let fixture: ComponentFixture<BookingCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
