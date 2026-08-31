import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSreComponent } from './add-sre.component';

describe('AddSreComponent', () => {
  let component: AddSreComponent;
  let fixture: ComponentFixture<AddSreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
