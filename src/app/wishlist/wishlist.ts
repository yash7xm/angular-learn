import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import { HousingLocationInfo } from '../housinglocation';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlistItems: HousingLocationInfo[] = [];

  constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist() {
    this.wishlistItems = this.wishlistService.getAllWishlistItems();
  }

  removeFromWishlist(id: number) {
    this.wishlistService.removeFromWishlist(id);
    this.loadWishlist(); // refresh list after removal
  }
}

