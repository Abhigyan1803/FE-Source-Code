import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCvrComponent } from './add-cvr.component';

describe('AddCvrComponent', () => {
  let component: AddCvrComponent;
  let fixture: ComponentFixture<AddCvrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCvrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCvrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
