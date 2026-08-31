import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidIntellectualComponent } from './mid-intellectual.component';

describe('MidIntellectualComponent', () => {
  let component: MidIntellectualComponent;
  let fixture: ComponentFixture<MidIntellectualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidIntellectualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidIntellectualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
