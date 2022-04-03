import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";

import { CalendarComponent } from "./calendar.component";

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [CalendarComponent],
})
export class CalendarECLModule {}
