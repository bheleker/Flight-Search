import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceMainComponent } from './price-main.component';

describe('PriceMainComponent', () => {
  let component: PriceMainComponent;
  let fixture: ComponentFixture<PriceMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
