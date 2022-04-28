import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseToSemesterComponent } from './add-course-to-semester.component';

describe('AddCourseToSemesterComponent', () => {
  let component: AddCourseToSemesterComponent;
  let fixture: ComponentFixture<AddCourseToSemesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCourseToSemesterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseToSemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
