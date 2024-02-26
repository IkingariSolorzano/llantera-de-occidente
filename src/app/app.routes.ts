import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authorizationGuard } from './authorization.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { CotizadorComponent } from './cotizador/cotizador.component';
import { ContactoComponent } from './contacto/contacto.component';
import { userGuard } from './guards/user.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [authorizationGuard, userGuard] },
  { path: 'cotizar', component: CotizadorComponent, canActivate: [authorizationGuard]},
  { path: 'contacto', component: ContactoComponent, canActivate: [authorizationGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'page-not-found' },
];
