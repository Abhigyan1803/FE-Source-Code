import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFinalTermComponent } from './add-final-term.component';

describe('AddFinalTermComponent', () => {
  let component: AddFinalTermComponent;
  let fixture: ComponentFixture<AddFinalTermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFinalTermComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFinalTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
