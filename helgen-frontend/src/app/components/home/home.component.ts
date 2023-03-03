import { Component, ViewChild, OnInit, AfterViewInit  } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild(NavbarComponent) navBar;
  
  public selectedBuses = [];
  public currentUserRole = this.apiService.currentUserRole
  public showUserContainer = localStorage.getItem('lastRouteUsed') == 'users' ? true : (!localStorage.getItem('lastRouteUsed') && this.currentUserRole == 'admin');;
  
  public eventsSubject: Subject<void> = new Subject<void>();
  constructor( 
    public apiService: ApiService
  ){ }

  ngOnInit(): void {
    this.apiService.checkAuth();
  }
  
  receiveMessage($event) {
    this.selectedBuses = $event
    this.emitEventToChild(this.selectedBuses)
  }

  receivePanel(event: boolean) {
    this.showUserContainer = event;  
  }

  emitEventToChild(data) {
    this.eventsSubject.next(data);
  }

  ngAfterViewInit() {
    this.selectedBuses = this.navBar.selectedBuses
  }
}
