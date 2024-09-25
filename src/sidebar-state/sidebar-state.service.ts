import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarStateService {

  private isActive = new BehaviorSubject<boolean>(false);
  isActive$= this.isActive.asObservable();
  toogleSideBar(){
    this.isActive.next(!this.isActive.getValue());
    console.log(this.isActive.getValue())
  }
    
  }