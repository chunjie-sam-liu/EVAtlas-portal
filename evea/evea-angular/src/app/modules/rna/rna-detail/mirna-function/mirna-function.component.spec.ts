import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MirnaFunctionComponent } from './mirna-function.component';

describe('MirnaFunctionComponent', () => {
  let component: MirnaFunctionComponent;
  let fixture: ComponentFixture<MirnaFunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MirnaFunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MirnaFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
