import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPanelComponent } from './detail-panel.component';

describe('DetailPanelComponent', () => {
  let component: DetailPanelComponent;
  let fixture: ComponentFixture<DetailPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
