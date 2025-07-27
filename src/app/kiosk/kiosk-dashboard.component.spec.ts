import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskDashboardComponent } from './kiosk-dashboard.component';

describe('KioskDashboardComponent', () => {
  let component: KioskDashboardComponent;
  let fixture: ComponentFixture<KioskDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KioskDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KioskDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
