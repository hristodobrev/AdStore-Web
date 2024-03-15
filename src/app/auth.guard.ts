import { CanActivateFn } from "@angular/router";
import { StateService } from "./state.service";
import { inject } from "@angular/core";
import { of, switchMap } from "rxjs";

export function authenticationGuard(): CanActivateFn {
  return () => {
    const stateService: StateService = inject(StateService);
    
    return stateService.userData.pipe(switchMap(userData => of(userData != null)));
  };
}