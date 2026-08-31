import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMrPracComponent } from './add-mr-prac.component';

describe('AddMrPracComponent', () => {
  let component: AddMrPracComponent;
  let fixture: ComponentFixture<AddMrPracComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMrPracComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMrPracComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
