import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOtherSecurityComponent } from './add-other-security.component';

describe('AddOtherSecurityComponent', () => {
  let component: AddOtherSecurityComponent;
  let fixture: ComponentFixture<AddOtherSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOtherSecurityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOtherSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
