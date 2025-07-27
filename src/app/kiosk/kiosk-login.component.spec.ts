import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskLoginComponent } from './kiosk-login.component';

describe('KioskLoginComponent', () => {
  let component: KioskLoginComponent;
  let fixture: ComponentFixture<KioskLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KioskLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KioskLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
