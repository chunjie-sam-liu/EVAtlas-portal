import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RnaTableComponent } from './rna-table.component';

describe('RnaTableComponent', () => {
  let component: RnaTableComponent;
  let fixture: ComponentFixture<RnaTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RnaTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RnaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
