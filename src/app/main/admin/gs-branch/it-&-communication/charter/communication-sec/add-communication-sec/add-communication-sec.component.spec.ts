import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommunicationSecComponent } from './add-communication-sec.component';

describe('AddCommunicationSecComponent', () => {
  let component: AddCommunicationSecComponent;
  let fixture: ComponentFixture<AddCommunicationSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCommunicationSecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommunicationSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
