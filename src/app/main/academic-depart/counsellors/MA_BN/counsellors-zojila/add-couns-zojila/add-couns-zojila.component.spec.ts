import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCounsZojilaComponent } from './add-couns-zojila.component';

describe('AddCounsZojilaComponent', () => {
  let component: AddCounsZojilaComponent;
  let fixture: ComponentFixture<AddCounsZojilaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCounsZojilaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCounsZojilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
