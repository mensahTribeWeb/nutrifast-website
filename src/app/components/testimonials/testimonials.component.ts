import {
  Component,
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TestimonialsComponent implements AfterViewInit {
  @ViewChildren('testimonialCard') testimonialCards!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    });

    this.testimonialCards.forEach((card) => {
      observer.observe(card.nativeElement);
    });
  }
}
