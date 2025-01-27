import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServicesCreationPanelComponent } from './admin-services-creation-panel.component';

describe('AdminServicesCreationPanelComponent', () => {
  let component: AdminServicesCreationPanelComponent;
  let fixture: ComponentFixture<AdminServicesCreationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminServicesCreationPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminServicesCreationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
