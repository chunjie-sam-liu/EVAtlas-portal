import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeContentComponent } from './spe-content.component';

describe('SpeContentComponent', () => {
  let component: SpeContentComponent;
  let fixture: ComponentFixture<SpeContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
