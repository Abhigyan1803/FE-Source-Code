import { Routes, RouterModule } from '@angular/router';

export const ACCESS_CONTROL_ROUTES: Routes = [
    // Guard for Modules
    { path: 'biometric-rfid', loadChildren: () => import('./biometric-rfid-card/biometric-rfid-card.module').then(m => m.BiometricRfidCardModule) },
    { path: 'vehicle-sticker', loadChildren: () => import('./vehicle-stickers-acs/vehicle-stickers.module').then(m => m.VehicleStickersAcsModule)},
    { path: 'entry-passes/combat', loadChildren: () => import('./entry-passes/combat/combat.module').then(m => m.CombatModule)},
    { path: 'entry-passes/civ', loadChildren: () => import('./entry-passes/civ-staff/civ-staff.module').then(m => m.CivStaffModule)},
    { path: 'entry-passes/casual', loadChildren: () => import('./entry-passes/casual-staff/casual-staff.module').then(m => m.CasualStaffModule)},

    
];