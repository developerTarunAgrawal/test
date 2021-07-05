import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  constructor() { }
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userDetails: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public formData: BehaviorSubject<any> = new BehaviorSubject<any>({});
}
