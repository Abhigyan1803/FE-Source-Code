import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntellectualSkillsComponent } from './intellectual-skills.component';

describe('IntellectualSkillsComponent', () => {
  let component: IntellectualSkillsComponent;
  let fixture: ComponentFixture<IntellectualSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntellectualSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntellectualSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
