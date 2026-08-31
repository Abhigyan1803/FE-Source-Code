import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorsSangroComponent } from './counsellors-sangro.component';

describe('CounsellorsSangroComponent', () => {
  let component: CounsellorsSangroComponent;
  let fixture: ComponentFixture<CounsellorsSangroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounsellorsSangroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorsSangroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
