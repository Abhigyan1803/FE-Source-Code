import { Routes, RouterModule } from '@angular/router';

export const ADJUTANT_ROUTES: Routes = [
    // Guard for Modules
    

    { path: 'aro', loadChildren: () => import('../../adjutant-branch/ARO/aro.module').then(m => m.AroModule) },
    { path: 'adjutant-order', loadChildren: () => import('../../adjutant-branch/officers-MS/adjutant orders/adjutant-order.module').then(m => m.AdjutantOrderModule) },
    { path: 'drill-competition', loadChildren: () => import('../../adjutant-branch/drill-competition/drill-comp.module').then(m => m.DrillCompModule) },
];