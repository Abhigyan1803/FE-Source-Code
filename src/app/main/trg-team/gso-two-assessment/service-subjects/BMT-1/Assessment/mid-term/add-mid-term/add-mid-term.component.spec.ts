import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMidTermComponent } from './add-mid-term.component';

describe('AddMidTermComponent', () => {
  let component: AddMidTermComponent;
  let fixture: ComponentFixture<AddMidTermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMidTermComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMidTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
