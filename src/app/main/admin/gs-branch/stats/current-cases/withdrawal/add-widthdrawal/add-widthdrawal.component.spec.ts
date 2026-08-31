import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWidthdrawalComponent } from './add-widthdrawal.component';

describe('AddWidthdrawalComponent', () => {
  let component: AddWidthdrawalComponent;
  let fixture: ComponentFixture<AddWidthdrawalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWidthdrawalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWidthdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
