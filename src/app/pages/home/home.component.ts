import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { CallToActionComponent } from '../../components/call-to-action/call-to-action.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    FeaturesComponent,
    CallToActionComponent,
    GalleryComponent,
    TestimonialsComponent,
    RouterModule,
  ],

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  title: string = 'Welcome to NutriFast';
  description: string = 'Optimize your health with smart meal planning.';
  buttonText1: string = 'Get Started';
  buttonLink1: string = '/signup';
  buttonText2: string = 'Learn More';
  buttonLink2: string = '/about';
}
