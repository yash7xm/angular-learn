import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HousingLocationInfo } from '../housinglocation';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-housing-location',
  imports: [RouterLink, MatIconModule],
  templateUrl: './housing-location.component.html',
  styleUrls: ['./housing-location.css']
})

export class HousingLocation {
  housingLocation = input.required<HousingLocationInfo>();

  wishlistedHouses = new Set<number>();

  toggleWishlist(id: number) {
    if (this.wishlistedHouses.has(id)) {
      this.wishlistedHouses.delete(id);
    } else {
      this.wishlistedHouses.add(id);
    }
  }

  isWishlisted(id: number): boolean {
    return this.wishlistedHouses.has(id);
  }

}
