import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPptComponent } from './add-ppt.component';

describe('AddPptComponent', () => {
  let component: AddPptComponent;
  let fixture: ComponentFixture<AddPptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
