import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDisplayComponent } from './course-display.component';

describe('CourseDisplayComponent', () => {
  let component: CourseDisplayComponent;
  let fixture: ComponentFixture<CourseDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
