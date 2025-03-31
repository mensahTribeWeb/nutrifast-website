import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component'; // Corrected path to AppComponent
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from './environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // Static initialization of Firebase provider
    RouterModule.forRoot([]),
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()), // Firebase Authentication
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
