import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItpppComponent } from './itppp.component';

describe('ItpppComponent', () => {
  let component: ItpppComponent;
  let fixture: ComponentFixture<ItpppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItpppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItpppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
