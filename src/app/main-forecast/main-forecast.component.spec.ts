import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainForecastComponent } from './main-forecast.component';

describe('MainForecastComponent', () => {
  let component: MainForecastComponent;
  let fixture: ComponentFixture<MainForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainForecastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
