import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HousingLocationInfo } from '../housinglocation';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-housing-location',
  imports: [RouterLink, MatIconModule],
  templateUrl: './housing-location.component.html',
  styleUrls: ['./housing-location.css'],
})
export class HousingLocation {
  housingLocation = input.required<HousingLocationInfo>();

  constructor(private wishlistService: WishlistService) { }

  toggleWishlist(item: HousingLocationInfo) {
    this.wishlistService.toggleWishlist(item);
  }

  isWishlisted(id: number): boolean {
    return this.wishlistService.isWishlisted(id);
  }
}
