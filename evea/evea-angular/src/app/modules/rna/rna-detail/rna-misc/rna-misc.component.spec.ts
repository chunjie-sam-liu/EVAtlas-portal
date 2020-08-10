import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RnaMiscComponent } from './rna-misc.component';

describe('RnaMiscComponent', () => {
  let component: RnaMiscComponent;
  let fixture: ComponentFixture<RnaMiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RnaMiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RnaMiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
