import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MainComponent } from "./main/main.component";
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { ProtectedComponent } from "./protected/protected.component";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { TemplateDrivenComponent } from "./template-driven/template-driven.component";
import { ReactiveComponent } from "./reactive/reactive.component";
import { ProductComponent } from "./product/product.component";
import { CategoryComponent } from './category/category.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ProductFormComponent } from "./product-form/product-form.component";
import { ProductService } from "./services/product.service";
import { AuthInterceptor } from "./services/auth.interceptor";
import { CategoryService } from "./services/category.service";


@NgModule({
    declarations: [MainComponent,
        LoginComponent,
        ProtectedComponent,
        HomeComponent,
        AboutComponent,
        ContactComponent,
        ProductComponent,
        TemplateDrivenComponent,
        ReactiveComponent,
        CategoryComponent,
        ProductFormComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes)],
    providers: [ProductService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        CategoryService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [MainComponent]
})

export class AppModule { }