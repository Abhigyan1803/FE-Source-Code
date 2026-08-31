import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalkitComponent } from './personalkit.component';

describe('PersonalkitComponent', () => {
  let component: PersonalkitComponent;
  let fixture: ComponentFixture<PersonalkitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalkitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalkitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
