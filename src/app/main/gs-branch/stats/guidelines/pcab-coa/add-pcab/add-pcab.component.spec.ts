import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPcabComponent } from './add-pcab.component';

describe('AddPcabComponent', () => {
  let component: AddPcabComponent;
  let fixture: ComponentFixture<AddPcabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPcabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPcabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
