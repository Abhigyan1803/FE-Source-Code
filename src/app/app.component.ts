import { Component, HostListener, Optional, ViewEncapsulation } from '@angular/core';
// import { TranslateService} from '@ngx-translate/core';
import { SharedService } from 'app/service/shared.service';
@Component({
   selector: 'gene-app',
   template: `<router-outlet></router-outlet>
   			 <ngx-loading-bar></ngx-loading-bar>
            <ngx-spinner
            bdColor = "rgba(0, 0, 0, 0.8)" size = "medium" color = "#fff" type = "ball-fall" [fullScreen] = "true"><p style="color: white">
            Please Wait.....
            </ngx-spinner>`,
   encapsulation: ViewEncapsulation.None
})

export class GeneAppComponent {
   // timeout;


   @HostListener('window:contextmenu', ['$event'])
   rightClick(event) {
      /**============= UNCOMMENT LETER ============= */
      // this.sharedService.openAlertSnackbarWithSeconds('This Feature is Disabled.', 3)
      // return false;
   }

   // @HostListener('window:keydown', ['$event'])
   // checkFunctionKey(event) {
   //    if (event.code) {
   //       // if (event.code == 'F12') {
   //       //    /**============= UNCOMMENT LETER ============= */
   //       //    this.sharedService.openAlertSnackbarWithSeconds('This Feature is Disabled.', 3)
   //       //    return false;
   //       // }
   //    }
   // }

   constructor(
      public sharedService: SharedService
      // translate: TranslateService
      // {timeout, onTimeout}
   ) {
      // translate.addLangs(['en', 'fr', 'he', 'ru' , 'ar' , 'zh' ,'de' , 'es', 'ja', 'ko' , 'it' ,'hu']);
      // translate.setDefaultLang('en');

      // const browserLang: string = translate.getBrowserLang();
      // translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

   }


}
