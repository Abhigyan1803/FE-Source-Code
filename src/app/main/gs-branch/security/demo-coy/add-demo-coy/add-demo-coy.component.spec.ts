import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDemoCoyComponent } from './add-demo-coy.component';

describe('AddDemoCoyComponent', () => {
  let component: AddDemoCoyComponent;
  let fixture: ComponentFixture<AddDemoCoyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDemoCoyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDemoCoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
