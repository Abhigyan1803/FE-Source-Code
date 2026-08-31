import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampSubjectComponent } from './camp-subject.component';

describe('CampSubjectComponent', () => {
  let component: CampSubjectComponent;
  let fixture: ComponentFixture<CampSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
