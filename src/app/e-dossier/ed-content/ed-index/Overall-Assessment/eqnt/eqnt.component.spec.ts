import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EqntComponent } from './eqnt.component';

describe('EqntComponent', () => {
  let component: EqntComponent;
  let fixture: ComponentFixture<EqntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EqntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EqntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
