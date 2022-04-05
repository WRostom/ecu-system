import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { TuiGroupModule } from "@taiga-ui/core";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";

import { SharedModule } from "../shared.module";
import { CalendarComponent } from "./calendar.component";

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    TuiGroupModule,
    SharedModule,
  ],
  exports: [CalendarComponent, TuiGroupModule],
})
export class CalendarECLModule {}
