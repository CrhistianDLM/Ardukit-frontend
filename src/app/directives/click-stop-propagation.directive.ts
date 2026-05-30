import { Directive, HostListener } from '@angular/core';

@Directive({ standalone: false,
  selector: '[appClickStopPropagation]'
})
export class ClickStopPropagationDirective {
  @HostListener("click", ["$event"])
    public onClick(event: any): void
    {
        event.stopPropagation();
    }
  constructor() { }

}
