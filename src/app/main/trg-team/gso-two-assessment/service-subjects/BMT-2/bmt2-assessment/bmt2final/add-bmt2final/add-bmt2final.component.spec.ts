import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBmt2finalComponent } from './add-bmt2final.component';

describe('AddBmt2finalComponent', () => {
  let component: AddBmt2finalComponent;
  let fixture: ComponentFixture<AddBmt2finalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBmt2finalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBmt2finalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
