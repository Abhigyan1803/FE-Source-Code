import { Routes, RouterModule } from '@angular/router';

export const GUIDELINES_ROUTES: Routes = [
    // Guard for Modules
    { path: 'administrative-instructions', loadChildren: () => import('./administrative-instructions/administrative-instructions.module').then(m => m.AdministrativeInstructionsModule) },
    { path: 'fgc-policy', loadChildren: () => import('./fgc-policy/fgc-policy.module').then(m => m.FgcPolicyModule) },
    { path: 'pcab-coa', loadChildren: () => import('./pcab-coa/pcab-coa.module').then(m => m.PcabCoaModule)},
    { path: 'standing-trg-directives', loadChildren: () => import('./standing-trg-directives/standing-trg-directives.module').then(m => m.StandingTrgDirectivesModule)},
    { path: 'misc', loadChildren: () => import('./misc/misc.module').then(m => m.MiscModule) },

];