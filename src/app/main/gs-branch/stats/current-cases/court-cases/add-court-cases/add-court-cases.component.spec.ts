import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourtCasesComponent } from './add-court-cases.component';

describe('AddCourtCasesComponent', () => {
  let component: AddCourtCasesComponent;
  let fixture: ComponentFixture<AddCourtCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCourtCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourtCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
