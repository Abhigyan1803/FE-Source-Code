import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIntellectualSkillsComponent } from './add-intellectual-skills.component';

describe('AddIntellectualSkillsComponent', () => {
  let component: AddIntellectualSkillsComponent;
  let fixture: ComponentFixture<AddIntellectualSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIntellectualSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIntellectualSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
