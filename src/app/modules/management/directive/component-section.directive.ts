import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[componentHost]",
})
export class ComponentSectionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
