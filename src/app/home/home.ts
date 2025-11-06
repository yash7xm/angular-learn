import { Component, inject, ViewChild } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../housinglocation';
import { HousingService } from '../housing';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  imports: [HousingLocation, MatPaginator],
  templateUrl: './home.component.html',
  styleUrls: ['./home.css'],
})
export class Home {
  housingLocationList: HousingLocationInfo[] = [];
  filteredLocationList: HousingLocationInfo[] = [];
  paginatedLocations: HousingLocationInfo[] = [];

  // Pagination variables
  pageSize = 5;
  currentPage = 0;
  totalItems = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  housingService: HousingService = inject(HousingService);

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

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedData();
  }

  updatePaginatedData() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedLocations = this.filteredLocationList.slice(startIndex, endIndex);
  }
}
