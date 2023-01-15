import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentmodalComponent } from './departmentmodal.component';

describe('DepartmentmodalComponent', () => {
  let component: DepartmentmodalComponent;
  let fixture: ComponentFixture<DepartmentmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
