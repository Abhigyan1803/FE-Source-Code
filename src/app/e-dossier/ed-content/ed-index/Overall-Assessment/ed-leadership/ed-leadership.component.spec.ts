import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdLeadershipComponent } from './ed-leadership.component';

describe('EdLeadershipComponent', () => {
  let component: EdLeadershipComponent;
  let fixture: ComponentFixture<EdLeadershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdLeadershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdLeadershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
