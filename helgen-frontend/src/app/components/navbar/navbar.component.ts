import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  @Output() messageEvent = new EventEmitter<any>();
  @Output() userPanel = new EventEmitter<boolean>(false);

  public buses: any;
  public selectedBuses: any = [];

  public currentUserRole = this.apiService.currentUserRole

  constructor(
    public apiService: ApiService,
    public routerService: Router
  ) { }

  ngOnInit(): void {
    console.log(this.routerService.url)
  }

  ngAfterViewInit() {
    this.apiService.getDataObject('vehicles').then(data => {
      if (this.currentUserRole != 'operador') {
        this.buses = data
      }
    })
  }

  selectBus(data){
    var checkbox = document.getElementById(data);
    if (checkbox['checked']) {
      this.selectedBuses.push(data)
      this.sendBuses(this.selectedBuses)
    } else {
      const index = this.selectedBuses.indexOf(data);
      if (index != -1) {
        this.selectedBuses.splice(index, 1)
        this.sendBuses(this.selectedBuses)
      }
    }

    this.apiService.selectedBuses = this.selectedBuses;
  }

  sendBuses(buses) {
    this.messageEvent.emit(buses)
  }

  emitContainer(value: boolean): void {
    this.userPanel.emit(value);
  }

  logout(){
    this.apiService.logoutUser();
  }
}
