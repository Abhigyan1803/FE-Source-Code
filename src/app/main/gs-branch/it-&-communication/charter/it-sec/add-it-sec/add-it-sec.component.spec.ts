import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItSecComponent } from './add-it-sec.component';

describe('AddItSecComponent', () => {
  let component: AddItSecComponent;
  let fixture: ComponentFixture<AddItSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItSecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
