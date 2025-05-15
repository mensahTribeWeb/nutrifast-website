import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
  encapsulation: ViewEncapsulation.None, // Enables full global style application
})
export class TestimonialsComponent implements AfterViewInit {
  @ViewChildren('testimonialCard', { read: ElementRef })
  testimonialCards!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.15 }
    );

    this.testimonialCards.forEach((card) => {
      observer.observe(card.nativeElement);
    });
  }
}
