import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendMainComponent } from './trend-main.component';

describe('TrendMainComponent', () => {
  let component: TrendMainComponent;
  let fixture: ComponentFixture<TrendMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
