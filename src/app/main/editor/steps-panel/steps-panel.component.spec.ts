import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsPanelComponent } from './steps-panel.component';

describe('StepsPanelComponent', () => {
  let component: StepsPanelComponent;
  let fixture: ComponentFixture<StepsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
