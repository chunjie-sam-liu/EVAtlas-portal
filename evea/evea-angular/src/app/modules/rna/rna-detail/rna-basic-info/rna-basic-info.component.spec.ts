import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RnaBasicInfoComponent } from './rna-basic-info.component';

describe('RnaBasicInfoComponent', () => {
  let component: RnaBasicInfoComponent;
  let fixture: ComponentFixture<RnaBasicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RnaBasicInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RnaBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
