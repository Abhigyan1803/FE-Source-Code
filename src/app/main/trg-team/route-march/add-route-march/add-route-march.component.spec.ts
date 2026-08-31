import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRouteMarchComponent } from './add-route-march.component';

describe('AddRouteMarchComponent', () => {
  let component: AddRouteMarchComponent;
  let fixture: ComponentFixture<AddRouteMarchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRouteMarchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRouteMarchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
