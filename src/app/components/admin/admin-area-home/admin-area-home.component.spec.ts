import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAreaHomeComponent } from './admin-area-home.component';

describe('AdminAreaHomeComponent', () => {
  let component: AdminAreaHomeComponent;
  let fixture: ComponentFixture<AdminAreaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAreaHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAreaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
