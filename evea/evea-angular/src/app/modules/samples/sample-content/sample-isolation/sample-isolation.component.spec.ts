import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleIsolationComponent } from './sample-isolation.component';

describe('SampleIsolationComponent', () => {
  let component: SampleIsolationComponent;
  let fixture: ComponentFixture<SampleIsolationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleIsolationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleIsolationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
