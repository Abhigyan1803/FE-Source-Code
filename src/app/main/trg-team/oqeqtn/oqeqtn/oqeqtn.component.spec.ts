import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OqeqtnComponent } from './oqeqtn.component';

describe('OqeqtnComponent', () => {
  let component: OqeqtnComponent;
  let fixture: ComponentFixture<OqeqtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OqeqtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OqeqtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
