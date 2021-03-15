import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardetailComponent } from './cardetail.component';

describe('CardetailComponent', () => {
  let component: CardetailComponent;
  let fixture: ComponentFixture<CardetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
