import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TuiSidebarModule } from "@taiga-ui/addon-mobile";
import { TuiTableModule } from "@taiga-ui/addon-table";
import { TuiActiveZoneModule, TuiLetModule } from "@taiga-ui/cdk";
import { TuiButtonModule, TuiDataListModule, TuiLabelModule, TuiLoaderModule, TuiTextfieldControllerModule } from "@taiga-ui/core";
import {
  TuiAccordionModule,
  TuiBreadcrumbsModule,
  TuiDataListWrapperModule,
  TuiInputCountModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiInputPhoneInternationalModule,
  TuiInputTimeModule,
  TuiIslandModule,
  TuiMultiSelectModule,
  TuiSelectModule,
  TuiTabsModule,
} from "@taiga-ui/kit";

@NgModule({
  declarations: [],
  imports: [
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
    TuiLetModule,
    TuiLoaderModule,
    TuiMultiSelectModule,
    TuiIslandModule,
    TuiAccordionModule,
  ],
  exports: [
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
    TuiLetModule,
    TuiLoaderModule,
    TuiMultiSelectModule,
    TuiIslandModule,
    TuiAccordionModule,
  ],
})
export class SharedModule {}
