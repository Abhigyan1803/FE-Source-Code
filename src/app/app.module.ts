
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Ng5BreadcrumbModule, BreadcrumbService } from 'ng5-breadcrumb';
import { TourMatMenuModule } from 'ngx-tour-md-menu';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { RoutingModule } from "./app-routing.module";
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { AuthService } from './service/auth-service/auth.service';
import { PageTitleService } from './core/page-title/page-title.service';
import { D3ChartService } from "./core/nvD3/nvD3.service";
import { GeneAppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { MenuToggleModule } from './core/menu/menu-toggle.module';
import { MenuItems } from './core/menu/menu-items/menu-items';
import { AuthGuard } from './core/guards/auth.guard';
import { HorizontalMenuItems } from './core/menu/horizontal-menu-items/horizontal-menu-items';

import { SideBarComponent } from './Shared/side-bar/side-bar.component';
import { MenuItemComponent } from './Shared/menu-item/menu-item.component';
import { FooterComponent } from './Shared/footer/footer.component';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TokenInterceptor } from 'app/service/auth-service/token.interceptor'
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import {EventDetailsDialogComponent} from '../app/main/shared-component/event-details-dialog/event-details-dialog.component';
import {ReadMoreDialogComponent} from '../app/main/shared-component/read-more-dialog/read-more-dialog.component';
import { NavService } from './Shared/menu-item/nav.service';
import { PostmanService } from './Shared/postman-service';

import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { MaterialModule } from './material/material.module';
import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './pages/home/home.component';
import { AroComponent } from './pages/aro/aro.component';
import {GreybookComponent} from './pages/greybook/greybook.component'
import { DialogComponent } from './Shared/dialog/dialog.component';
import {SyllabusComponent} from './pages/syllabus/syllabus.component';
import {SyllabusTableComponent} from './pages/syllabus/syllabus-table/syllabus-table.component';

import { PgmesComponent } from './pages/pgmes/pgmes.component';

import {CyberpolicyComponent } from './pages/cyberpolicy/cyberpolicy.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RecommendedListComponent} from './pages/recommended-list/recommended-list.component';
import { OrgChartsComponent } from './pages/org-charts/org-charts.component';
import {GcAwardComponent} from './pages/hall-of-fame/gc-award/gc-award.component';
import { GallantryAwardeesComponent } from './pages/hall-of-fame/gallantry-awardees/gallantry-awardees.component';
import { ImaBlogComponent } from './pages/ima-blog/ima-blog.component';
import { AddImablogComponent } from './pages/add-imablog/add-imablog.component';

import { ReadBlogComponent } from './pages/read-blog/read-blog.component';
import { DailyPgmesComponent } from './pages/daily-pgmes/daily-pgmes.component';
import { SectionHospitalComponent } from './pages/section-hospital/section-hospital.component';
import { SocialListComponent } from './pages/social-list/social-list.component';
import { UpcomingEventComponent } from './pages/upcoming-event/upcoming-event.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import {GentlemanCadetComponent} from './gentleman-cadet/gentleman-cadet.component'
import { CKEditorModule } from 'ckeditor4-angular';
import { EDossierComponent } from './e-dossier/e-dossier.component';
import { UsersGuard } from './core/guards/users.guard';
import { ParedComponent } from './pages/pared/pared.component';
import { StudyMaterialComponent } from './pages/study-material/study-material.component';
import { DeleteAssignmentsComponent } from './Shared/delete-assignments/delete-assignments.component';
import { EBookListComponent } from './pages/e-book-list/e-book-list.component';



export const firebaseConfig = {
	apiKey: "AIzaSyCE0po6Q8jGuBEds-A903KEU4U6Cerojzo",
	authDomain: "gene-eaeef.firebaseapp.com",
	databaseURL: "https://gene-eaeef.firebaseio.com",
	projectId: "gene-eaeef",
	storageBucket: "gene-eaeef.appspot.com",
	messagingSenderId: "81833823583",
	appId: "1:81833823583:web:581d7ddd8cfa93a4"
}

// AoT requires an exported function for factories
// export function HttpLoaderFactory(http: HttpClient) {
// //    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
// return ''
// }

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	suppressScrollX: true
};

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		RoutingModule,
		FlexLayoutModule,
		// PagesModule,
		Ng5BreadcrumbModule.forRoot(),
		TourMatMenuModule.forRoot(),
		PerfectScrollbarModule,
		MenuToggleModule,
		HttpClientModule,
		TranslateModule.forRoot({
			//  loader: {
			// 		provide: TranslateLoader,
			// 		useFactory: HttpLoaderFactory,
			// 		deps: [HttpClient]
			//  }
		}),
		AngularFireModule.initializeApp(firebaseConfig),
		AngularFireAuthModule,
		
		ToastrModule.forRoot(),
		LoadingBarRouterModule,
		LoadingBarRouterModule,
		SlickCarouselModule,
		NgxSpinnerModule,
		NgxDocViewerModule,
		MaterialModule, NgbModule, FormsModule, ReactiveFormsModule, CKEditorModule,
	],
	declarations: [
		GeneAppComponent,
		MenuItemComponent,
		EventDetailsDialogComponent,ReadMoreDialogComponent,DialogComponent,DeleteAssignmentsComponent,
		MainComponent, SideBarComponent, FooterComponent,
		
		PagesComponent,
		HomeComponent,		
		GreybookComponent, AroComponent, SyllabusComponent, SyllabusTableComponent  ,CyberpolicyComponent, PgmesComponent,
		RecommendedListComponent, OrgChartsComponent, GcAwardComponent, GallantryAwardeesComponent,
		DailyPgmesComponent, ImaBlogComponent,SectionHospitalComponent,StudyMaterialComponent,AddImablogComponent,
		ReadBlogComponent,SocialListComponent,UpcomingEventComponent,AboutUsComponent,ParedComponent,GentlemanCadetComponent,EDossierComponent,EBookListComponent
	],
	entryComponents:[EventDetailsDialogComponent,ReadMoreDialogComponent, DialogComponent,DeleteAssignmentsComponent],
	bootstrap: [GeneAppComponent],
	providers: [
		PostmanService,
		D3ChartService,
		MenuItems,
		NavService,
		HorizontalMenuItems,
		BreadcrumbService,
		PageTitleService,
		AuthService,

		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		},

		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		},

		AuthGuard, UsersGuard,
		NgxSpinnerService
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeneAppModule { }
