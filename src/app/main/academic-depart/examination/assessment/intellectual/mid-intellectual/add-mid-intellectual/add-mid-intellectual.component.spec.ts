import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMidIntellectualComponent } from './add-mid-intellectual.component';

describe('AddMidIntellectualComponent', () => {
  let component: AddMidIntellectualComponent;
  let fixture: ComponentFixture<AddMidIntellectualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMidIntellectualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMidIntellectualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
