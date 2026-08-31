import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRespOfInvigilationComponent } from './add-resp-of-invigilation.component';

describe('AddRespOfInvigilationComponent', () => {
  let component: AddRespOfInvigilationComponent;
  let fixture: ComponentFixture<AddRespOfInvigilationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRespOfInvigilationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRespOfInvigilationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
