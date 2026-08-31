import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EDossierComponent } from './e-dossier.component';

describe('EDossierComponent', () => {
  let component: EDossierComponent;
  let fixture: ComponentFixture<EDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EDossierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
