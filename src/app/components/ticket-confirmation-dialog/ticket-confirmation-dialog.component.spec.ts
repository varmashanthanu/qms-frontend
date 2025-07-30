import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketConfirmationDialogComponent } from './ticket-confirmation-dialog.component';

describe('TicketConfirmationDialogComponent', () => {
  let component: TicketConfirmationDialogComponent;
  let fixture: ComponentFixture<TicketConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketConfirmationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
