import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConusSangroComponent } from './add-conus-sangro.component';

describe('AddConusSangroComponent', () => {
  let component: AddConusSangroComponent;
  let fixture: ComponentFixture<AddConusSangroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConusSangroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConusSangroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
