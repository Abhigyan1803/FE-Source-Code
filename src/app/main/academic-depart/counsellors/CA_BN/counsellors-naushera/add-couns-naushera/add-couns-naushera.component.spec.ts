import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCounsNausheraComponent } from './add-couns-naushera.component';

describe('AddCounsNausheraComponent', () => {
  let component: AddCounsNausheraComponent;
  let fixture: ComponentFixture<AddCounsNausheraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCounsNausheraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCounsNausheraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
