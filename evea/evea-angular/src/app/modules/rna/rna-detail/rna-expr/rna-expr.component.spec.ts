import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RnaExprComponent } from './rna-expr.component';

describe('RnaExprComponent', () => {
  let component: RnaExprComponent;
  let fixture: ComponentFixture<RnaExprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RnaExprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RnaExprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
