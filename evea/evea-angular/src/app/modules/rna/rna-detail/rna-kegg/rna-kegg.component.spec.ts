import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RnaKeggComponent } from './rna-kegg.component';

describe('RnaKeggComponent', () => {
  let component: RnaKeggComponent;
  let fixture: ComponentFixture<RnaKeggComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RnaKeggComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RnaKeggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
