import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {filter, map} from 'rxjs/operators';

export function onUrlChange(router: Router) {
  return router.events.pipe(
    filter((event: RouterEvent) => event instanceof NavigationEnd)
  );
}


export function onStateVariablesReceive(activatedRoute: ActivatedRoute) {
  return activatedRoute.paramMap
    .pipe(map(() => window.history.state));
}
