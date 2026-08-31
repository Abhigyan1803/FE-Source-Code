import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCreditExellenceComponent } from './add-credit-exellence.component';

describe('AddCreditExellenceComponent', () => {
  let component: AddCreditExellenceComponent;
  let fixture: ComponentFixture<AddCreditExellenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCreditExellenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCreditExellenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
