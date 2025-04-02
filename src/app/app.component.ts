import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Used for ngIf, ngFor, etc.
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
  ], // Standalone components and RouterModule for routing
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'NutriFast'; // Set title of the app
}
