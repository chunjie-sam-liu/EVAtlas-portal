import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RnaAvgTableComponent } from './rna-avg-table.component';

describe('RnaAvgTableComponent', () => {
  let component: RnaAvgTableComponent;
  let fixture: ComponentFixture<RnaAvgTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RnaAvgTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RnaAvgTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
