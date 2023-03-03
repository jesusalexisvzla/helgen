import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, NavigationControl, Marker } from 'maplibre-gl';

import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {

  public isLoading = false;

  map: Map | undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  private eventsSubscription: Subscription;

  @Input() events: Observable<any>;

  public initialState = { lng: -6.25365, lat: 53.349731, zoom: 16 };

  public buses = {}

  currentUserRole = this.apiService.currentUserRole

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.isLoading = true;
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=BnD7OQXtAP6XWSZzaQ5s`,
      center: [this.initialState.lng, this.initialState.lat],
      zoom: this.initialState.zoom
    });
    this.map.addControl(new NavigationControl({}), 'top-right');
    this.apiService.getDataObject('positionLogs').then(data => {
      if (this.currentUserRole != 'operador') {
        this.setMarkers(data)
      }
    })
    this.setListeners()
  }

  setListeners() {
    this.eventsSubscription = this.events.subscribe((data) => {
      this.isLoading = true;
      const busses = data
      let properties: any = []
      for (const bus of busses) {
        properties.push('vehicle')
      }
      this.apiService.getDataObjectFiltered('positionLogs', {
          properties: properties,
          value: data,
          options: {
            manyValues: true,
          }
        }).then(data => {
          this.map.remove()
          this.map = new Map({
            container: this.mapContainer.nativeElement,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=BnD7OQXtAP6XWSZzaQ5s`,
            center: [this.initialState.lng, this.initialState.lat],
            zoom: this.initialState.zoom
          });
          this.map.addControl(new NavigationControl({}), 'top-right');
          if (this.currentUserRole != 'operador') {
            this.setMarkers(data)
          }
        })
    });
  }

  setMarkers(data) {
    for (const [i, position] of data.entries()) {
      if (!this.buses[position.vehicle]) {
        this.buses[position.vehicle] = {
          color: '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)
        }
      }
      if (!isNaN(position?.longitude) && !isNaN(position?.latitude)) {
        new Marker({color: this.buses[position.vehicle].color})
        .setLngLat([position.longitude, position.latitude])
        .addTo(this.map);
      }
    }
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
