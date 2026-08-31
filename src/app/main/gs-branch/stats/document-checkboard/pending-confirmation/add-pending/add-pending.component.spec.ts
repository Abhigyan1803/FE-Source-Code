import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPendingComponent } from './add-pending.component';

describe('AddPendingComponent', () => {
  let component: AddPendingComponent;
  let fixture: ComponentFixture<AddPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
