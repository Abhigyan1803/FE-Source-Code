import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorsMeiktilaComponent } from './counsellors-meiktila.component';

describe('CounsellorsMeiktilaComponent', () => {
  let component: CounsellorsMeiktilaComponent;
  let fixture: ComponentFixture<CounsellorsMeiktilaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounsellorsMeiktilaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorsMeiktilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
