import { formatDate } from "@angular/common";
import { Inject, Injectable, LOCALE_ID } from "@angular/core";

import { CalendarEvent, CalendarEventTitleFormatter } from "angular-calendar";

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }

  // you can override any of the methods defined in the parent class

  override month(event: CalendarEvent): string {
    return `<b>(${formatDate(event.meta["startTime"], "hh:mm a", this.locale)} - ${formatDate(
      event.meta["endTime"],
      "hh:mm a",
      this.locale
    )})</b>  ${event.title}`;
  }
}
