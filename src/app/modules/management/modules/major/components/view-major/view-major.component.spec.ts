import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMajorComponent } from './view-major.component';

describe('ViewMajorComponent', () => {
  let component: ViewMajorComponent;
  let fixture: ComponentFixture<ViewMajorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMajorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMajorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
