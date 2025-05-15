import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GalleryComponent implements AfterViewInit {
  @ViewChildren('galleryImage', { read: ElementRef })
  images!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    this.images.forEach((img) => observer.observe(img.nativeElement));
  }
}
