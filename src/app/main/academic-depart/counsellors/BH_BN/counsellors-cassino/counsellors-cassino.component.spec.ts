import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorsCassinoComponent } from './counsellors-cassino.component';

describe('CounsellorsCassinoComponent', () => {
  let component: CounsellorsCassinoComponent;
  let fixture: ComponentFixture<CounsellorsCassinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounsellorsCassinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorsCassinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
