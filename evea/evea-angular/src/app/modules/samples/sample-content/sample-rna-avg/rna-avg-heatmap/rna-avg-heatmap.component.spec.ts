import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RnaAvgHeatmapComponent } from './rna-avg-heatmap.component';

describe('RnaAvgHeatmapComponent', () => {
  let component: RnaAvgHeatmapComponent;
  let fixture: ComponentFixture<RnaAvgHeatmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RnaAvgHeatmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RnaAvgHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
