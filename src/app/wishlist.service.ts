import { Injectable } from '@angular/core';
import { HousingLocationInfo } from './housinglocation';

@Injectable({
    providedIn: 'root',
})
export class WishlistService {
    private wishlist = new Map<number, HousingLocationInfo>();
    private storageKey = 'wishlist_data';

    constructor() {
        this.loadFromStorage();
    }

    private saveToStorage() {
        const list = Array.from(this.wishlist.values());
        localStorage.setItem(this.storageKey, JSON.stringify(list));
    }

    private loadFromStorage() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            try {
                const parsed: HousingLocationInfo[] = JSON.parse(saved);
                parsed.forEach(item => {
                    if (item?.id) this.wishlist.set(item.id, item);
                });
            } catch (e) {
                console.error('Failed to load wishlist from storage', e);
            }
        }
    }

    addToWishlist(item: HousingLocationInfo) {
        if (!item?.id) return;
        this.wishlist.set(item.id, item);
        this.saveToStorage();
    }

    removeFromWishlist(id: number) {
        this.wishlist.delete(id);
        this.saveToStorage();
    }

    isWishlisted(id: number): boolean {
        return this.wishlist.has(id);
    }

    toggleWishlist(item: HousingLocationInfo) {
        if (this.isWishlisted(item.id)) {
            this.removeFromWishlist(item.id);
        } else {
            this.addToWishlist(item);
        }
    }

    getAllWishlistItems(): HousingLocationInfo[] {
        return Array.from(this.wishlist.values());
    }
}
