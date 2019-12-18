import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayMainComponent } from './day-main.component';

describe('DayMainComponent', () => {
  let component: DayMainComponent;
  let fixture: ComponentFixture<DayMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
