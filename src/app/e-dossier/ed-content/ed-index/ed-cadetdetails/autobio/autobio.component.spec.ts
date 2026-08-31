import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutobioComponent } from './autobio.component';

describe('AutobioComponent', () => {
  let component: AutobioComponent;
  let fixture: ComponentFixture<AutobioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutobioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutobioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
