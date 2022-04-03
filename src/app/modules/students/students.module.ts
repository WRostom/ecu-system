import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from "src/app/shared/shared.module";
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { ViewStudentComponent } from './components/view-student/view-student.component';


@NgModule({
  declarations: [
    StudentsComponent,
    AddStudentComponent,
    ViewStudentComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule
  ]
})
export class StudentsModule { }
