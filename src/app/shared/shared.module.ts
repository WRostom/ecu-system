import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TuiSidebarModule } from "@taiga-ui/addon-mobile";
import { TuiTableModule } from "@taiga-ui/addon-table";
import { TuiActiveZoneModule } from "@taiga-ui/cdk";
import { TuiButtonModule, TuiTextfieldControllerModule, TuiLabelModule, TuiDataListModule } from "@taiga-ui/core";
import { TuiBreadcrumbsModule, TuiTabsModule, TuiInputModule, TuiSelectModule, TuiDataListWrapperModule, TuiInputCountModule, TuiInputDateModule, TuiInputTimeModule, TuiInputPhoneInternationalModule } from "@taiga-ui/kit";
@NgModule({
  declarations: [],
  imports:  [
    CommonModule,
    TuiBreadcrumbsModule,
    TuiTabsModule,
    TuiTableModule,
    TuiInputModule,
    TuiButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiSidebarModule,
    TuiActiveZoneModule,
    TuiLabelModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiInputCountModule,
    TuiInputDateModule,
    TuiInputTimeModule,
    TuiInputPhoneInternationalModule,
  ],
  exports:[
    TuiBreadcrumbsModule,
    TuiTabsModule,
    TuiTableModule,
    TuiInputModule,
    TuiButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiSidebarModule,
    TuiActiveZoneModule,
    TuiLabelModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiInputCountModule,
    TuiInputDateModule,
    TuiInputTimeModule,
    TuiInputPhoneInternationalModule,
  ]
})
export class SharedModule {}
