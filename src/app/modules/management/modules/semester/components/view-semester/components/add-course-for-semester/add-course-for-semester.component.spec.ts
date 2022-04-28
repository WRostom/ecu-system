import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseForSemesterComponent } from './add-course-for-semester.component';

describe('AddCourseForSemesterComponent', () => {
  let component: AddCourseForSemesterComponent;
  let fixture: ComponentFixture<AddCourseForSemesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCourseForSemesterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseForSemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
