import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingManageComponent } from './booking-manage.component';

describe('BookingCreationComponent', () => {
  let component: BookingManageComponent;
  let fixture: ComponentFixture<BookingManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
