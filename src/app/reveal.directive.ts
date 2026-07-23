import { AfterViewInit, Directive, ElementRef, NgZone, OnDestroy } from '@angular/core';

/**
 * Reveals a section once it enters the viewport (10% visible), mirroring the
 * IntersectionObserver behavior of the original design. Usage:
 *   <section appReveal #svc="reveal">
 *     <div [ngClass]="svc.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
 */
@Directive({
  selector: '[appReveal]',
  exportAs: 'reveal',
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  visible = false;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.visible = true;
      return;
    }
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // IntersectionObserver callbacks run outside Angular's zone
        this.zone.run(() => (this.visible = true));
        this.observer?.disconnect();
      }
    }, { threshold: 0.1 });
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
