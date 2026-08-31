import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCounsellorsDograiComponent } from './add-counsellors-dograi.component';

describe('AddCounsellorsDograiComponent', () => {
  let component: AddCounsellorsDograiComponent;
  let fixture: ComponentFixture<AddCounsellorsDograiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCounsellorsDograiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCounsellorsDograiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
