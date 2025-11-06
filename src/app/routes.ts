import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Details } from './details/details';
import { WishlistComponent } from './wishlist/wishlist';

const routeConfig: Routes = [
    {
        path: '',
        component: Home,
        title: 'Home Page',
    },
    {
        path: 'details/:id',
        component: Details,
        title: 'Home details',
    },
    {
        path: 'wishlist',
        component: WishlistComponent,
        title: 'Wishlist'
    }
];

export default routeConfig;