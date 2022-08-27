import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Alert {
  type: 'success' | 'danger' | 'warning';
  text: string;
}

@Injectable()
export class AlertService {
  public alert$: Subject<Alert> = new Subject<Alert>();

  success(text: string) {
    this.alert$.next({ type: 'success', text });
  }
  warning(text: string) {
    this.alert$.next({ type: 'warning', text });
  }
  danger(text: string) {
    this.alert$.next({ type: 'danger', text });
  }
}
 