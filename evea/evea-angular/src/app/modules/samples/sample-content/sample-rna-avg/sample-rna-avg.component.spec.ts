import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleRnaAvgComponent } from './sample-rna-avg.component';

describe('SampleRnaAvgComponent', () => {
  let component: SampleRnaAvgComponent;
  let fixture: ComponentFixture<SampleRnaAvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleRnaAvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleRnaAvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
