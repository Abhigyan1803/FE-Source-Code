import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampmarksComponent } from './campmarks.component';

describe('CampmarksComponent', () => {
  let component: CampmarksComponent;
  let fixture: ComponentFixture<CampmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampmarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
