import { effect, inject } from '@angular/core';
import { CanActivateFn, GuardResult, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const authGuard: CanActivateFn = (route, state) => {
 
  const router = inject(Router);

  const promise = new Promise<GuardResult>((resolve, _) => {
      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          resolve(router.createUrlTree(['/list']))
        } else{
          resolve(true)
        }
      })
  })

  return promise;


};
