import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RnaDetailComponent } from './rna-detail.component';

describe('RnaDetailComponent', () => {
  let component: RnaDetailComponent;
  let fixture: ComponentFixture<RnaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RnaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RnaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
