import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImablogComponent } from './add-imablog.component';

describe('AddImablogComponent', () => {
  let component: AddImablogComponent;
  let fixture: ComponentFixture<AddImablogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddImablogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImablogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
