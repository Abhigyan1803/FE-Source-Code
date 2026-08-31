import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportgameComponent } from './sportgame.component';

describe('SportgameComponent', () => {
  let component: SportgameComponent;
  let fixture: ComponentFixture<SportgameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportgameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
