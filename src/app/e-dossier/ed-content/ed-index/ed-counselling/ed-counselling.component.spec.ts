import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdCounsellingComponent } from './ed-counselling.component';

describe('EdCounsellingComponent', () => {
  let component: EdCounsellingComponent;
  let fixture: ComponentFixture<EdCounsellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdCounsellingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdCounsellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
