import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConusCassinoComponent } from './add-conus-cassino.component';

describe('AddConusCassinoComponent', () => {
  let component: AddConusCassinoComponent;
  let fixture: ComponentFixture<AddConusCassinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConusCassinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConusCassinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
