import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConusSingarhComponent } from './add-conus-singarh.component';

describe('AddConusSingarhComponent', () => {
  let component: AddConusSingarhComponent;
  let fixture: ComponentFixture<AddConusSingarhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConusSingarhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConusSingarhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
