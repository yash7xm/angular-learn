import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HousingLocationInfo } from './housinglocation';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HousingService {
    private url = 'assets/houses.json'; // 👈 local file path

    constructor(private http: HttpClient) { }

    // Fetch all housing locations
    async getAllHousingLocations(): Promise<HousingLocationInfo[]> {
        try {
            const data$ = this.http.get<HousingLocationInfo[]>(this.url);
            return await firstValueFrom(data$);
        } catch (err) {
            console.error('Error loading local houses.json', err);
            return [];
        }
    }

    // Get one house by ID
    async getHousingLocationById(id: number): Promise<HousingLocationInfo | undefined> {
        try {
            const houses = await this.getAllHousingLocations();
            return houses.find(house => house.id === id);
        } catch (err) {
            console.error('Error fetching housing by ID', err);
            return undefined;
        }
    }

    submitApplication(firstName: string, lastName: string, email: string) {
        console.log('Application submitted for:', firstName, lastName, email);
    }
}
