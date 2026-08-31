import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorsSingarhComponent } from './counsellors-singarh.component';

describe('CounsellorsSingarhComponent', () => {
  let component: CounsellorsSingarhComponent;
  let fixture: ComponentFixture<CounsellorsSingarhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounsellorsSingarhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorsSingarhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
