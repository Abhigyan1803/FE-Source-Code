import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunbackComponent } from './runback.component';

describe('RunbackComponent', () => {
  let component: RunbackComponent;
  let fixture: ComponentFixture<RunbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
