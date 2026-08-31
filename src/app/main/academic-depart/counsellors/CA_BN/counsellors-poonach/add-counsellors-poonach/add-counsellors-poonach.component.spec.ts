import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCounsellorsPoonachComponent } from './add-counsellors-poonach.component';

describe('AddCounsellorsPoonachComponent', () => {
  let component: AddCounsellorsPoonachComponent;
  let fixture: ComponentFixture<AddCounsellorsPoonachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCounsellorsPoonachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCounsellorsPoonachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
