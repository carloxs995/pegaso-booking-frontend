import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServicesManagementComponent } from './admin-services-management.component';

describe('AdminServicesManagementComponent', () => {
  let component: AdminServicesManagementComponent;
  let fixture: ComponentFixture<AdminServicesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminServicesManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminServicesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
