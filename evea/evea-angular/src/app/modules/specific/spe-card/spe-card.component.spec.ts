import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeCardComponent } from './spe-card.component';

describe('SpeCardComponent', () => {
  let component: SpeCardComponent;
  let fixture: ComponentFixture<SpeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
