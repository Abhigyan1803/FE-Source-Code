import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteMarchComponent } from './route-march.component';

describe('RouteMarchComponent', () => {
  let component: RouteMarchComponent;
  let fixture: ComponentFixture<RouteMarchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteMarchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteMarchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
