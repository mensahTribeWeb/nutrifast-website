// src/app/components/hero/hero.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  imports: [RouterModule, CommonModule],
})
export class HeroComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() buttonText1: string = '';
  @Input() buttonLink1: string = '';
  @Input() buttonText2: string = '';
  @Input() buttonLink2: string = '';
}
