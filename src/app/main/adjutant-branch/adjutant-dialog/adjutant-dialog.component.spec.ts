import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjutantDialogComponent } from './adjutant-dialog.component';

describe('AdjutantDialogComponent', () => {
  let component: AdjutantDialogComponent;
  let fixture: ComponentFixture<AdjutantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdjutantDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjutantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
