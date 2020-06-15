import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplesStatisticsComponent } from './samples-statistics.component';

describe('SamplesStatisticsComponent', () => {
  let component: SamplesStatisticsComponent;
  let fixture: ComponentFixture<SamplesStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplesStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplesStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
