import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFcgComponent } from './add-fcg.component';

describe('AddFcgComponent', () => {
  let component: AddFcgComponent;
  let fixture: ComponentFixture<AddFcgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFcgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFcgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
