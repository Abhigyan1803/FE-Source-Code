import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPopComponent } from './add-pop.component';

describe('AddPopComponent', () => {
  let component: AddPopComponent;
  let fixture: ComponentFixture<AddPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
