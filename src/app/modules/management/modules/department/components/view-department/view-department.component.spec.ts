import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ViewDepartmentComponent } from "./view-department.component";

describe("ViewFacultyComponent", () => {
  let component: ViewDepartmentComponent;
  let fixture: ComponentFixture<ViewDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewDepartmentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
