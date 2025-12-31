import { Directive, ElementRef, Input, inject, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[safeHtml]',
  standalone: true,
})
export class SafeHtmlDirective {
  private readonly elementRef = inject(ElementRef);
  private readonly sanitizer = inject(DomSanitizer);

  @Input('safeHtml')
  set html(value: string | null | undefined) {
    const safeValue = this.sanitizer.sanitize(SecurityContext.HTML, value || '');
    this.elementRef.nativeElement.innerHTML = safeValue;
  }
}
