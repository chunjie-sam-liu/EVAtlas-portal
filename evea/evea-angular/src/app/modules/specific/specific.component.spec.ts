import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificComponent } from './specific.component';

describe('SpecificComponent', () => {
  let component: SpecificComponent;
  let fixture: ComponentFixture<SpecificComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
