import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterViewBlockComponent } from './semester-view-block.component';

describe('SemesterViewBlockComponent', () => {
  let component: SemesterViewBlockComponent;
  let fixture: ComponentFixture<SemesterViewBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterViewBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterViewBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
