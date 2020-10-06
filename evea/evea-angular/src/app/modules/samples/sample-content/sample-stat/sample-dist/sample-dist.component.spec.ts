import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleDistComponent } from './sample-dist.component';

describe('SampleDistComponent', () => {
  let component: SampleDistComponent;
  let fixture: ComponentFixture<SampleDistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleDistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleDistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
