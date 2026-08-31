import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationSecComponent } from './communication-sec.component';

describe('CommunicationSecComponent', () => {
  let component: CommunicationSecComponent;
  let fixture: ComponentFixture<CommunicationSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunicationSecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
