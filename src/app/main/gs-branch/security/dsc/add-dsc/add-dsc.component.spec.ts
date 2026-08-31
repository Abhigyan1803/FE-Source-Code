import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDscComponent } from './add-dsc.component';

describe('AddDscComponent', () => {
  let component: AddDscComponent;
  let fixture: ComponentFixture<AddDscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDscComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
