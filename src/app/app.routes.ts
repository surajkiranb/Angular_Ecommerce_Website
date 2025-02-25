import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { ProtectedComponent } from './protected/protected.component';
import { AuthGuard } from './services/auth.guard';
import { TemplateDrivenComponent } from './template-driven/template-driven.component';
import { ReactiveComponent } from './reactive/reactive.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { ProductFormComponent } from './product-form/product-form.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
    { path: 'contact', component: ContactComponent },
    { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
    { path: 'product-form', component: ProductFormComponent },
    { path: 'product-form/:id', component: ProductFormComponent },
    { path: '', redirectTo: '/product', pathMatch: 'full' },
    { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
    { path: 'template-driven', component: TemplateDrivenComponent },
    { path: 'reactive', component: ReactiveComponent },
    { path: '**', component: PageNotFoundComponent },
];
