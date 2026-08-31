import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCounsMeiktilaComponent } from './add-couns-meiktila.component';

describe('AddCounsMeiktilaComponent', () => {
  let component: AddCounsMeiktilaComponent;
  let fixture: ComponentFixture<AddCounsMeiktilaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCounsMeiktilaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCounsMeiktilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
