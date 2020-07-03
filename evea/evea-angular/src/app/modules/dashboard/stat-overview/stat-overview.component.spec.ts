import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatOverviewComponent } from './stat-overview.component';

describe('StatOverviewComponent', () => {
  let component: StatOverviewComponent;
  let fixture: ComponentFixture<StatOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
