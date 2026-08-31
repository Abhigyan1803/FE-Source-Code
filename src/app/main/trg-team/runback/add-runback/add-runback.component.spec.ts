import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRunbackComponent } from './add-runback.component';

describe('AddRunbackComponent', () => {
  let component: AddRunbackComponent;
  let fixture: ComponentFixture<AddRunbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRunbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRunbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
