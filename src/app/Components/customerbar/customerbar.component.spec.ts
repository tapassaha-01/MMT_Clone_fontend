import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerbarComponent } from './customerbar.component';

describe('CustomerbarComponent', () => {
  let component: CustomerbarComponent;
  let fixture: ComponentFixture<CustomerbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
