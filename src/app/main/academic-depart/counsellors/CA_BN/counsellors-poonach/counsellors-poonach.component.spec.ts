import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorsPoonachComponent } from './counsellors-poonach.component';

describe('CounsellorsPoonachComponent', () => {
  let component: CounsellorsPoonachComponent;
  let fixture: ComponentFixture<CounsellorsPoonachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounsellorsPoonachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorsPoonachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
