import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionmodalComponent } from './positionmodal.component';

describe('PositionmodalComponent', () => {
  let component: PositionmodalComponent;
  let fixture: ComponentFixture<PositionmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
