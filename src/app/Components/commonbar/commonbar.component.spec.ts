import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonbarComponent } from './commonbar.component';

describe('CommonbarComponent', () => {
  let component: CommonbarComponent;
  let fixture: ComponentFixture<CommonbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
