import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Details } from './details/details';
import { WishlistComponent } from './wishlist/wishlist';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';

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
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: 'Register'
    }
];

export default routeConfig;