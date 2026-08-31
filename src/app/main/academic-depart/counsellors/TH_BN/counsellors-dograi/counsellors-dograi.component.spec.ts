import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorsDograiComponent } from './counsellors-dograi.component';

describe('CounsellorsDograiComponent', () => {
  let component: CounsellorsDograiComponent;
  let fixture: ComponentFixture<CounsellorsDograiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounsellorsDograiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorsDograiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
