import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersnolComponent } from './persnol.component';

describe('PersnolComponent', () => {
  let component: PersnolComponent;
  let fixture: ComponentFixture<PersnolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersnolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersnolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
