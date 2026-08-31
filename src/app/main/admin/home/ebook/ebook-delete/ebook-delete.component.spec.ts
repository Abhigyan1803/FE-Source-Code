import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbookDeleteComponent } from './ebook-delete.component';

describe('EbookDeleteComponent', () => {
  let component: EbookDeleteComponent;
  let fixture: ComponentFixture<EbookDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EbookDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EbookDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
