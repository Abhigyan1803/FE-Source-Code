import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRpSecComponent } from './add-rp-sec.component';

describe('AddRpSecComponent', () => {
  let component: AddRpSecComponent;
  let fixture: ComponentFixture<AddRpSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRpSecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRpSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
