import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcDeleteComponent } from './gc-delete.component';

describe('GcDeleteComponent', () => {
  let component: GcDeleteComponent;
  let fixture: ComponentFixture<GcDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GcDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GcDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
