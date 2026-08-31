import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCounsHajipirComponent } from './add-couns-hajipir.component';

describe('AddCounsHajipirComponent', () => {
  let component: AddCounsHajipirComponent;
  let fixture: ComponentFixture<AddCounsHajipirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCounsHajipirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCounsHajipirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
