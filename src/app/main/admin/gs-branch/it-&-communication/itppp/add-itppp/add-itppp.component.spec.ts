import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItpppComponent } from './add-itppp.component';

describe('AddItpppComponent', () => {
  let component: AddItpppComponent;
  let fixture: ComponentFixture<AddItpppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItpppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItpppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
