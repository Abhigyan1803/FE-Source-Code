import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrPracComponent } from './mr-prac.component';

describe('MrPracComponent', () => {
  let component: MrPracComponent;
  let fixture: ComponentFixture<MrPracComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrPracComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MrPracComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
