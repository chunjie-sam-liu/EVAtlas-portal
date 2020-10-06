import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RnaRefComponent } from './rna-ref.component';

describe('RnaRefComponent', () => {
  let component: RnaRefComponent;
  let fixture: ComponentFixture<RnaRefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RnaRefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RnaRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
