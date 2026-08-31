export const Routings = {
    dashboardPath: 'dashboard',
    weaponsListPath: 'weapons/:id',
    addWeaponsPath: 'add/weapons',
    editWeaponsPath: "weapons/edit/:id",
    weaponTrainingPath:'weapon/training/:type',
    trainingResultPath:'weapon/training/add/result',
    finalResultPath:'weapon/training/final/result'
};

export const LocalStorage = {
    oAuth_token: '@', 
}


export const StringText = {
    duplicate:'Duplicate values are not allowed!',
    weapon:'Weapon successfully added'
    
}

export const Constants = {
    routes: Routings,
    messages: StringText,
    localStorage: LocalStorage
};