import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCounsellorsAlameinComponent } from './add-counsellors-alamein.component';

describe('AddCounsellorsAlameinComponent', () => {
  let component: AddCounsellorsAlameinComponent;
  let fixture: ComponentFixture<AddCounsellorsAlameinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCounsellorsAlameinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCounsellorsAlameinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
