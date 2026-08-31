import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSubjectComponent } from './service-subject.component';

describe('ServiceSubjectComponent', () => {
  let component: ServiceSubjectComponent;
  let fixture: ComponentFixture<ServiceSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
