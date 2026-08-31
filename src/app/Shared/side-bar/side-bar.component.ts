import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CoreService } from '../../service/core/core.service';
import { MenuItems } from '../../core/menu/menu-items/menu-items';

@Component({
	selector: 'ms-side-bar',
	templateUrl: './side-bar.component.html',
	styleUrls: ['./side-bar.component.scss']
})

export class SideBarComponent implements OnInit {

	@Input() menuList: any;
	@Input() verticalMenuStatus: boolean;
	templateTitle: string = ''



	constructor(public translate: TranslateService,
		private router: Router,
		public coreService: CoreService,
		public menuItems: MenuItems) { }

	ngOnInit() {
		if (this.router.url.includes('admin')) {
			this.templateTitle = 'ADMIN'
		} else if (this.router.url.includes('trg-team')) {
			this.templateTitle = 'TRG TEAM'
		}
		else if (this.router.url.includes('trg-battalion')) {
			this.templateTitle = 'TRG BATTALION'
		} else if (this.router.url.includes('adjutant-branch')) {
			this.templateTitle = 'ADJUTANT BRANCH'
		}
		else if (this.router.url.includes('gs-branch')) {
			this.templateTitle = 'GS BRANCH'
		} else if (this.router.url.includes('academic-depart')) {
			this.templateTitle = 'ACADEMIC DEPT.'
		} else if (this.router.url.includes('delay-dashboard')) {
			this.templateTitle = 'DELAY DASHBOARD'
		}

	}

	//render to the crm page
	onClick() {
		// var first = location.pathname.split('/')[1];
		// if(first == 'horizontal'){
		//    this.router.navigate(['/horizontal/dashboard/crm']);
		// } else {
		//    this.router.navigate(['/dashboard/crm']);
		// }
	}


	openSubMenu2(id, aero) {
		// console.log(id + ' with flag2 ' + aero);
		
		if (document.getElementById(id).style.display == "none") {
			document.getElementById(id).style.display = "block";
			document.getElementById(aero).style.transform = "rotate(90deg)";
		}
		else {
			document.getElementById(id).style.display = "none";
			document.getElementById(aero).style.transform = "rotate(0deg)";
		}
	}

	openSubMenu3(id, aero) {
		// console.log(id + " with flag3 "+aero);
		
		if (document.getElementById(id).style.display == "none"){
			document.getElementById(id).style.display = "block";
			document.getElementById(aero).style.transform = "rotate(90deg)";
		}
		else{
			document.getElementById(id).style.display = "none";
			document.getElementById(aero).style.transform = "rotate(0deg)";
		}
	}
}
