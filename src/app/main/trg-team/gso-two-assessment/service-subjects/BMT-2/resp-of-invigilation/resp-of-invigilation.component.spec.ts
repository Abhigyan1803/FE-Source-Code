import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespOfInvigilationComponent } from './resp-of-invigilation.component';

describe('RespOfInvigilationComponent', () => {
  let component: RespOfInvigilationComponent;
  let fixture: ComponentFixture<RespOfInvigilationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespOfInvigilationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RespOfInvigilationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
