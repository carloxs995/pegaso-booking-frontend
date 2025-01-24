import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookingsManagementComponent } from './admin-bookings-management.component';

describe('AdminBookingsManagementComponent', () => {
  let component: AdminBookingsManagementComponent;
  let fixture: ComponentFixture<AdminBookingsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBookingsManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBookingsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
