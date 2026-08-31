import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHindiDebComponent } from './add-hindi-deb.component';

describe('AddHindiDebComponent', () => {
  let component: AddHindiDebComponent;
  let fixture: ComponentFixture<AddHindiDebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHindiDebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHindiDebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
