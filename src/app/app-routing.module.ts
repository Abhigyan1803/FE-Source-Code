import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UsersGuard } from './core/guards/users.guard';

import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './pages/home/home.component';
import { AroComponent } from './pages/aro/aro.component';
import { GreybookComponent } from './pages/greybook/greybook.component'
import { SyllabusComponent } from './pages/syllabus/syllabus.component';
import { CyberpolicyComponent } from './pages/cyberpolicy/cyberpolicy.component'
import { PgmesComponent } from './pages/pgmes/pgmes.component';
import { OrgChartsComponent } from './pages/org-charts/org-charts.component';
import { GcAwardComponent } from './pages/hall-of-fame/gc-award/gc-award.component';
import { RecommendedListComponent } from './pages/recommended-list/recommended-list.component';
import {  EBookListComponent } from './pages/e-book-list/e-book-list.component';
import { GallantryAwardeesComponent } from './pages/hall-of-fame/gallantry-awardees/gallantry-awardees.component';
import { ImaBlogComponent } from './pages/ima-blog/ima-blog.component';
import { ReadBlogComponent } from './pages/read-blog/read-blog.component';
import { SocialListComponent } from './pages/social-list/social-list.component';
import { SectionHospitalComponent } from './pages/section-hospital/section-hospital.component';
import { DailyPgmesComponent } from './pages/daily-pgmes/daily-pgmes.component';
import { UpcomingEventComponent } from './pages/upcoming-event/upcoming-event.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HistoryComponent } from './pages/about-us/history/history.component';
import { LifeGCComponent } from './pages/about-us/life-gc/life-gc.component';
import { OrganizationComponent } from './pages/about-us/organization/organization.component';
import { EntriesComponent } from './pages/about-us/entries/entries.component';
import { GentlemanCadetComponent } from './gentleman-cadet/gentleman-cadet.component';
import { EDossierComponent } from './e-dossier/e-dossier.component';
import { LoggedInGuard } from './core/guards/loggedIn.guard';
import {ParedComponent} from './pages/pared/pared.component';
import { StudyMaterialComponent } from './pages/study-material/study-material.component';
import { AddImablogComponent } from './pages/add-imablog/add-imablog.component';


const appRoutes: Routes = [
   {
      path: '',
      redirectTo: 'pages',
      pathMatch: 'full',
   },

   {
      path: 'pages',
      component: PagesComponent,
      children: [
         {
            path: '', redirectTo: 'home', pathMatch: 'full'
         },
         {
            path: 'aro', component: AroComponent
         },
         
         {
            path: 'reading-list', component: RecommendedListComponent
         },
         {
            path: 'e-book-list', component: EBookListComponent
         },
         {
            path: 'home', component: HomeComponent
         },
         {
            path: 'greybook', component: GreybookComponent
         },
         {
            path: 'cyberpolicy', component: CyberpolicyComponent
         },
         {
            path: 'social-list', component: SocialListComponent
         },
         {
            path: 'academic-pared', component: ParedComponent
         },
         {
            path: 'sectional-hospital', component: SectionHospitalComponent
         },
         {
            path: 'about', component: AboutUsComponent,
         },
         {
            path: 'organization', component: OrganizationComponent,
         },
         {
            path: 'entries', component: EntriesComponent,
         },
         {
            path: 'GC-life', component: LifeGCComponent,
         },
         {
            path: 'history', component: HistoryComponent
         },
         {
            path: 'upcoming', component: UpcomingEventComponent
         },
         {
            path: 'forcast-of-trg-events',
            loadChildren: () => import('./calendar/calendar.module').then(m => m.Calendar_Module)
         },
         {
            path: 'syllabus', component: SyllabusComponent
         },
         {
            path: 'study-material', component: StudyMaterialComponent
         },
         {
            path: 'pgmes', component: PgmesComponent
         },
         {
            path: 'org-chart', component: OrgChartsComponent
         },
         {
            path: 'hall-of-fame/gallantry-awardees', component: GallantryAwardeesComponent
         },
         {
            path: 'ima-blog', component: ImaBlogComponent
         },
         
         {
            path: 'add-imablog', component: AddImablogComponent
         },
         {
            path: 'read-blog/:id', component: ReadBlogComponent
         },
         {
            path: 'daily-pgmes', component: DailyPgmesComponent
         },
         
      ]
   },
   {
      path: 'session',
      loadChildren: () => import('./session/session.module').then(m => m.SessionModule),
      canActivate: [LoggedInGuard],

   },
   {
      path: 'academic-pared', loadChildren:()=>import('./pages/pared/pared.module').then((m)=>m.ParedModule)
   },
   // {   
   //    path: 'pages/comingsoon',
   //    component : CommingsoonComponent
   // }, 
   // {   
   //    path: 'pages/maintenance',
   //    component : MaintenanceComponent
   // },
   // {   
   //    path: 'horizontal/pages/comingsoon',
   //    component : CommingsoonComponent
   // },
   // {   
   //    path: 'horizontal/pages/maintenance',
   //    component : MaintenanceComponent
   // },
   {
      path: 'gc',
      component: GentlemanCadetComponent,
      canActivate: [AuthGuard],

      children: [
         {
            path: 'content',
            loadChildren: () => import('./gentleman-cadet/content/gc.module').then(m => m.GCModule),
         }
      ]
   },
   {
      path: 'e-dossior',
      component: EDossierComponent,
      canActivate: [AuthGuard],

      children: [
         {
            path: 'ed-content',
            loadChildren: () => import('./e-dossier/ed-content/dossier.module').then(m => m.DossierModule),
         }
      ]
   },
   {
      path: 'main',
      component: MainComponent,
      canActivate: [AuthGuard],
      // runGuardsAndResolvers: 'always',
      children: [
         {
            path: 'admin',
            loadChildren: () => import('./main/admin/admin.module').then(m => m.AdminModule),
            // canActivate: [UsersGuard],
            // data: { expectedUserAdmin: '1' }
         },
         {
            path: 'trg-team',
            loadChildren: () => import('./main/trg-team/trg-team.module').then(m => m.TrgTeamModule),
            canActivate: [UsersGuard],
            data: { expectedUser: '1', expectedUserAdmin: '1' }
         },
         {
            path: 'trg-battalion',
            loadChildren: () => import('./main/trg-battalion/trg-battalion.module').then(m => m.TrgBattalionModule),
            canActivate: [UsersGuard],
            data: { expectedUser: '2', expectedUserAdmin: '1' }
         },
         {
            path: 'adjutant-branch',
            loadChildren: () => import('./main/adjutant-branch/adjutant-branch.module').then(m => m.AdjutantModule),
            canActivate: [UsersGuard],
            data: { expectedUser: '12',expectedUserAdmin: '1' }
         },
         {
            path: 'gs-branch',
            loadChildren: () => import('./main/gs-branch/gs-branch.module').then(m => m.GS_BranchModule),
            canActivate: [UsersGuard],
            data: { expectedUser: '10', expectedUserAdmin: '1' }
         },
         {
            path: 'academic-depart',
            loadChildren: () => import('./main/academic-depart/academic-depart.module').then(m => m.AcademicDepartmentModule),
            canActivate: [UsersGuard],
            data: { expectedUser: '4', expectedUserAdmin: '1' }
         },
         {
            path: 'delay-dashboard',
            loadChildren: () => import('./main/delay-dashboard/delay-dashboard.module').then(m => m.DelayDashboardModule),
            // canActivate: [UsersGuard],
         },
      ]
   },

]

@NgModule({
   imports: [RouterModule.forRoot(appRoutes,
      { useHash: true },
      //  { relativeLinkResolution: 'legacy' }
   )],
   exports: [RouterModule],
   providers: []
})

export class RoutingModule { }
