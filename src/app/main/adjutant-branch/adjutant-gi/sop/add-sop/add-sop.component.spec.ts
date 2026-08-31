import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSopComponent } from './add-sop.component';

describe('AddSopComponent', () => {
  let component: AddSopComponent;
  let fixture: ComponentFixture<AddSopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
