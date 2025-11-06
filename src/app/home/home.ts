import { Component, inject, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../housinglocation';
import { HousingService } from '../housing.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [HousingLocation, MatPaginator],
  templateUrl: './home.component.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit, OnDestroy {
  housingLocationList: HousingLocationInfo[] = [];
  filteredLocationList: HousingLocationInfo[] = [];
  paginatedLocations: HousingLocationInfo[] = [];

  // Pagination variables
  pageSize = 6;
  currentPage = 0;
  totalItems = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  housingService: HousingService = inject(HousingService);

  // Health check variables
  private http = inject(HttpClient);
  private backendUrl = 'https://pet-store-backend-05kn.onrender.com/getData';
  private healthCheckInterval: any;

  constructor() {
    this.housingService.getAllHousingLocations().then(
      (housingLocationList: HousingLocationInfo[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
        this.totalItems = housingLocationList.length;
        this.updatePaginatedData();
      }
    );
  }

  ngOnInit() {
    // Wake up backend when app starts
    this.pingBackend();

    // Send health check every 50 seconds
    this.healthCheckInterval = setInterval(() => {
      this.pingBackend();
    }, 50000);
  }

  ngOnDestroy() {
    // Stop interval when leaving component
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }
  }

  // Backend ping function
  private pingBackend() {
    this.http.post(this.backendUrl, { timestamp: new Date().toISOString() }, { responseType: 'text' }).subscribe({
      next: (res) => console.log('✅ Backend awake:', res),
      error: (err) => console.warn('⚠️ Backend ping failed:', err.message),
    });
  }


  // Filtering logic 
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    } else {
      this.filteredLocationList = this.housingLocationList.filter(
        (housingLocation) =>
          housingLocation?.city.toLowerCase().includes(text.toLowerCase())
      );
    }

    this.totalItems = this.filteredLocationList.length;
    this.currentPage = 0; // reset to first page
    this.updatePaginatedData();
  }

  // Pagination event 
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedData();
  }

  // Update paginated slice
  updatePaginatedData() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedLocations = this.filteredLocationList.slice(
      startIndex,
      endIndex
    );
  }
}
