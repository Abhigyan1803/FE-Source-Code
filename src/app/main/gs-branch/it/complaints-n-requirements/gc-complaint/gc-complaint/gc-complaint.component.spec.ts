import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcComplaintComponent } from './gc-complaint.component';

describe('GcComplaintComponent', () => {
  let component: GcComplaintComponent;
  let fixture: ComponentFixture<GcComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GcComplaintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GcComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
