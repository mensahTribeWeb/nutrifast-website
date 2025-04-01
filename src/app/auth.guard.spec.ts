import { TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let afAuthMock: jasmine.SpyObj<AngularFireAuth>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Create spies for dependencies
    afAuthMock = jasmine.createSpyObj('AngularFireAuth', ['authState']);
    // afAuthMock.authState.and.returnValue(of(null));
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    // Configure the testing module
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AngularFireAuth, useValue: afAuthMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    // Inject the guard
    guard = TestBed.inject(AuthGuard);
  });

  it('should allow activation if user is authenticated', (done) => {
    // afAuthMock.authState.and.returnValue(of({ uid: '12345' })); // Mock authenticated user

    guard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBe(true);
      done();
    });
  });

  it('should prevent activation and redirect if user is not authenticated', (done) => {
    // afAuthMock.authState.and.returnValue(of(null)); // Mock unauthenticated user

    guard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBeFalsy();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/auth/login']);
      done();
    });
  });
});
