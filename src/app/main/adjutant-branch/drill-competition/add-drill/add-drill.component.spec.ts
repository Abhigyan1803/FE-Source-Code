import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDrillComponent } from './add-drill.component';

describe('AddDrillComponent', () => {
  let component: AddDrillComponent;
  let fixture: ComponentFixture<AddDrillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDrillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDrillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
