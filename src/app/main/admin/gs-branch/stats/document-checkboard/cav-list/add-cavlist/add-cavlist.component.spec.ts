import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCavlistComponent } from './add-cavlist.component';

describe('AddCavlistComponent', () => {
  let component: AddCavlistComponent;
  let fixture: ComponentFixture<AddCavlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCavlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCavlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
