import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleStatComponent } from './sample-stat.component';

describe('SampleStatComponent', () => {
  let component: SampleStatComponent;
  let fixture: ComponentFixture<SampleStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
