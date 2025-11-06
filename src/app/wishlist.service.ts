import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HousingLocationInfo } from './housinglocation';

const STORAGE_KEY = 'housing_wishlist_v1';

@Injectable({
    providedIn: 'root'
})
export class WishlistService {
    private wishlistMap = new Map<number, HousingLocationInfo>();
    private wishlistSubject = new BehaviorSubject<HousingLocationInfo[]>([]);
    wishlist$ = this.wishlistSubject.asObservable();

    constructor() {
        this.loadFromStorage();
    }

    private saveToStorage() {
        const arr = Array.from(this.wishlistMap.values());
        localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    }

    private loadFromStorage() {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        try {
            const arr: HousingLocationInfo[] = JSON.parse(raw);
            for (const item of arr) {
                if (item?.id != null) this.wishlistMap.set(item.id, item);
            }
            this.wishlistSubject.next(Array.from(this.wishlistMap.values()));
        } catch (e) {
            console.warn('Failed to parse wishlist from storage', e);
        }
    }

    // Add or remove toggle
    toggle(item: HousingLocationInfo) {
        if (!item?.id) return;
        if (this.wishlistMap.has(item.id)) {
            this.wishlistMap.delete(item.id);
        } else {
            this.wishlistMap.set(item.id, item);
        }
        this.wishlistSubject.next(Array.from(this.wishlistMap.values()));
        this.saveToStorage();
    }

    add(item: HousingLocationInfo) {
        if (!item?.id) return;
        this.wishlistMap.set(item.id, item);
        this.wishlistSubject.next(Array.from(this.wishlistMap.values()));
        this.saveToStorage();
    }

    remove(itemId: number) {
        this.wishlistMap.delete(itemId);
        this.wishlistSubject.next(Array.from(this.wishlistMap.values()));
        this.saveToStorage();
    }

    isInWishlist(itemId: number): boolean {
        return this.wishlistMap.has(itemId);
    }

    clear() {
        this.wishlistMap.clear();
        this.wishlistSubject.next([]);
        localStorage.removeItem(STORAGE_KEY);
    }
}
