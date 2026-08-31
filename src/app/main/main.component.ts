import { filter } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, ViewChild, HostListener, ViewEncapsulation } from '@angular/core';
import { MenuItems } from '../core/menu/menu-items/menu-items';
import { BreadcrumbService } from 'ng5-breadcrumb';
import { PageTitleService } from '../core/page-title/page-title.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute, Event, NavigationError, ActivationEnd } from '@angular/router';
import { Location, PopStateEvent } from "@angular/common";

import { Subscription } from 'rxjs';
import { TourService } from 'ngx-tour-md-menu';
import PerfectScrollbar from 'perfect-scrollbar';
import { AuthService } from '../service/auth-service/auth.service';

import { CoreService } from '../service/core/core.service';
import { NavigationEvent } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
import { Constants } from 'app/Constants/Constants';
import { LoginV2Component } from 'app/session/loginV2/loginV2.component';

declare var require;

const screenfull = require('screenfull');

@Component({
	selector: 'gene-layout',
	templateUrl: './main-material.html',
	styleUrls: ['./main-material.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		'(window:resize)': 'onResize($event)'
	}
})

export class MainComponent implements OnInit, OnDestroy {
	@ViewChild(LoginV2Component) loginComp;

	currentRoute
	previousUrl
	currentUrl: any;
	root: any = 'ltr';
	layout: any = 'ltr';
	currentLang: any = 'en';
	customizerIn: boolean = false;
	showSettings: boolean = false;
	chatpanelOpen: boolean = false;
	sidenavOpen: boolean = true;
	isMobile: boolean = false;
	isFullscreen: boolean = false;
	collapseSidebarStatus: boolean;
	header: string;
	dark: boolean;
	compactSidebar: boolean;
	isMobileStatus: boolean;
	sidenavMode: string = 'side';
	popupDeleteResponse: any;
	sidebarColor: any;
	url: string;
	windowSize: number;
	private _routerEventsSubscription: Subscription;
	private _router: Subscription;
	@ViewChild('sidenav', { static: true }) sidenav;
	name;
	serviceId;

	userDetails: any;
	tempMenus: any[] = [];
	moduleMenus: any
	menus: any[] = [];

	sideBarFilterClass: any = [
		{
			sideBarSelect: "sidebar-color-1",
			colorSelect: "sidebar-color-dark"
		},
		{
			sideBarSelect: "sidebar-color-2",
			colorSelect: "sidebar-color-primary",
		},
		{
			sideBarSelect: "sidebar-color-3",
			colorSelect: "sidebar-color-accent"
		},
		{
			sideBarSelect: "sidebar-color-4",
			colorSelect: "sidebar-color-warn"
		},
		{
			sideBarSelect: "sidebar-color-5",
			colorSelect: "sidebar-color-green"
		}
	]

	headerFilterClass: any = [
		{
			headerSelect: "header-color-1",
			colorSelect: "header-color-dark"
		},
		{
			headerSelect: "header-color-2",
			colorSelect: "header-color-primary"
		},
		{
			headerSelect: "header-color-3",
			colorSelect: "header-color-accent"
		},
		{
			headerSelect: "header-color-4",
			colorSelect: "header-color-warning"
		},
		{
			headerSelect: "header-color-5",
			colorSelect: "header-color-green"
		}
	]

	chatList: any[] = [
		{
			image: "assets/img/user-1.jpg",
			name: "John Smith",
			chat: "Lorem ipsum simply dummy",
			mode: "online"
		},
		{
			image: "assets/img/user-2.jpg",
			name: "Amanda Brown",
			chat: "Lorem ipsum simply dummy",
			mode: "online"
		},
		{
			image: "assets/img/user-3.jpg",
			name: "Justin Randolf",
			chat: "Lorem ipsum simply dummy",
			mode: "offline"
		},
		{
			image: "assets/img/user-4.jpg",
			name: "Randy SunSung",
			chat: "Lorem ipsum simply dummy",
			mode: "online"
		},
		{
			image: "assets/img/user-5.jpg",
			name: "Lisa Myth",
			chat: "Lorem ipsum simply dummy",
			mode: "online"
		},
	]

	private lastPoppedUrl: string;
	private yScrollStack: number[] = [];
	constructor(private location: Location, public tourService: TourService, public menuItems: MenuItems, private breadcrumbService: BreadcrumbService,
		private pageTitleService: PageTitleService, public translate: TranslateService, private router: Router,
		private authService: AuthService, public coreService: CoreService, private routes: Router, private activatedRoute: ActivatedRoute) {

		this.initListners()


		this.userDetails = JSON.parse(localStorage.getItem('loginResponse')).object;

		// console.log(this.userDetails);

	}

	ngOnInit() {

		this.location.subscribe((ev: PopStateEvent) => {
			this.lastPoppedUrl = ev.url;
		});

		this.router.events.subscribe((ev: any) => {

			if (ev instanceof NavigationStart) {
				if (!localStorage.getItem('jwtToken')) {
					return false;
				}
				if (ev.url != this.lastPoppedUrl)
					this.yScrollStack.push(window.scrollY);

			} else if (ev instanceof NavigationEnd) {
				if (ev.url == this.lastPoppedUrl) {
					this.lastPoppedUrl = undefined;
					window.scrollTo(0, this.yScrollStack.pop());
				} else
					window.scrollTo(0, 0);
			}
		});

		//logout if localstorage is empty
		if (!localStorage.length) {
			this.router.navigate(['/pages'])
		}


		// this.router.events.pipe(
		//     filter((event) => event instanceof NavigationEnd)
		// ).subscribe((event: NavigationEnd) => {
		//    this.previousUrl = this.currentUrl;
		//    this.currentUrl = event.url;
		//    localStorage.setItem('backRoute',this.previousUrl)
		//    localStorage.setItem('currentRoute',this.currentUrl)
		// });

		/**
		 * 	MODULES I'Ds AND SUBMODULES I'Ds ARE COMING FROM BACKEND
		 */

		if (this.router.url.includes('main/admin')) {
			let id = this.userDetails.adminId;
			// console.log('Admin Id: ',id);
			this.menus = this.menuItems.getAdminMenu();

		} else if (this.router.url.includes('main/trg-team')) {
			const tempMenus = this.menuItems.getTrgMenu();

			let id = this.userDetails.loginId;

			if (id == 1) {
				this.menus = this.menuItems.getTrgMenu();
			} else {
				this.setMenus(tempMenus)
				// this.moduleMenus = this.userDetails.moduleList.modulesPayLoadList.find(
				// 	(element:any)=>{
				// 		if(element.id == 1){
				// 			// console.log(element);
				// 			return element
				// 		}
				// 	}
				// )
				// tempMenus.forEach(
				// 	(el: any) => {
				// 		if (el.id == 'common') {
				// 			this.menus.push(el)
				// 		} else {
				// 			this.moduleMenus.subModules.find(
				// 				(elm: any) => {
				// 					if (elm.id == el.id) {
				// 						// console.log(elm);

				// 						this.menus.push(el)
				// 					}
				// 				}
				// 			)


				// 		}
				// 	}
				// )




			}





		} else if (this.router.url.includes('main/trg-battalion')) {
			// this.menus = this.menuItems.getTRGBattalionMenus()

			const tempMenus = this.menuItems.getTRGBattalionMenus();

			let id = this.userDetails.loginId;
			// console.log("User I'd: ",id);


			if (id == 1) {
				this.menus = this.menuItems.getTRGBattalionMenus();
			} else {
				this.setMenus(tempMenus)

				// this.moduleMenus = this.userDetails.moduleList.modulesPayLoadList.find(
				// 	(element:any)=>{
				// 		if(element.id == 2){
				// 			// console.log(element);

				// 			return element
				// 		}
				// 	}
				// )
				// tempMenus.forEach(
				// 	(el: any) => {
				// 		if (el.id == 'common') {
				// 			this.menus.push(el)
				// 		} else {
				// 			this.moduleMenus.subModules.find(
				// 				(elm: any) => {
				// 					if (elm.id == el.id) {
				// 						// console.log(elm);

				// 						this.menus.push(el)
				// 					}
				// 				}
				// 			)


				// 		}
				// 	}
				// )
			}






		} else if (this.router.url.includes('main/adjutant-branch')) {
			// this.menus = this.menuItems.getAdjutant()

			const tempMenus = this.menuItems.getAdjutant();

			let id = this.userDetails.loginId;
			// console.log("User I'd: ",id);


			if (id == 1) {
				this.menus = this.menuItems.getAdjutant();
			} else {
				this.setMenus(tempMenus)

				// this.moduleMenus = this.userDetails.moduleList.modulesPayLoadList.find(
				// 	(element:any)=>{
				// 		if(element.id == 12){
				// 			// console.log(element);
				// 			return element
				// 		}
				// 	}
				// )
				// tempMenus.forEach(
				// 	(el: any) => {
				// 		if (el.id == 'common') {
				// 			this.menus.push(el)
				// 		} else {
				// 			this.moduleMenus.subModules.find(
				// 				(elm: any) => {
				// 					if (elm.id == el.id) {
				// 						// console.log(elm);
				// 						this.menus.push(el)
				// 					}
				// 				}
				// 			)


				// 		}
				// 	}
				// )
			}






		} else if (this.router.url.includes('main/gs-branch')) {
			// this.menus = this.menuItems.getGSBranchMenus()
			const tempMenus = this.menuItems.getGSBranchMenus();

			let id = this.userDetails.loginId;
			// console.log("User I'd: ",id);


			if (id == 1) {
				this.menus = this.menuItems.getGSBranchMenus();
			} else {
				this.setMenus(tempMenus)


				// this.moduleMenus = this.userDetails.moduleList.modulesPayLoadList.find(
				// 	(element:any)=>{
				// 		if(element.id == 10){
				// 			// console.log(element);
				// 			return element
				// 		}
				// 	}
				// )
				// tempMenus.forEach(
				// 	(el: any) => {
				// 		if (el.id == 'common') {
				// 			this.menus.push(el)
				// 		} else {
				// 			this.moduleMenus.subModules.find(
				// 				(elm: any) => {
				// 					if (elm.id == el.id) {
				// 						// console.log(elm);
				// 						this.menus.push(el)
				// 					}
				// 				}
				// 			)


				// 		}
				// 	}
				// )
			}





		} else if (this.router.url.includes('main/academic-depart')) {
			// this.menus = this.menuItems.getAcademicDepartMenus()

			const tempMenus = this.menuItems.getAcademicDepartMenus();

			let id = this.userDetails.loginId;
			// console.log("User I'd: ",id);
			if (id == 1) {
				this.menus = this.menuItems.getAcademicDepartMenus();
			} else {
				this.setMenus(tempMenus)

				// this.moduleMenus = this.userDetails.moduleList.modulesPayLoadList.find(
				// 	(element:any)=>{
				// 		if(element.id == 4){
				// 			// console.log(element);
				// 			return element
				// 		}
				// 	}
				// )
				// tempMenus.forEach(
				// 	(el: any) => {
				// 		if (el.id == 'common') {
				// 			this.menus.push(el)
				// 		} else {
				// 			this.moduleMenus.subModules.find(
				// 				(elm: any) => {
				// 					if (elm.id == el.id) {
				// 						// console.log(elm);
				// 						this.menus.push(el)
				// 					}
				// 				}
				// 			)


				// 		}
				// 	}
				// )
			}

		} else if (this.router.url.includes('main/delay-dashboard/')) {
			this.menus = this.menuItems.getDelayDashboardMenus()
		}

		this.name = localStorage.getItem('userName')
		this.serviceId = localStorage.getItem('serviceId')

	}


	setMenus(tempMenus) {
		this.moduleMenus = JSON.parse(localStorage.getItem('menus'))
		tempMenus.forEach(
			(el: any) => {
				if (el.id == 'common') {
					this.menus.push(el)
				} else {
					this.moduleMenus.find(
						(elm: any) => {
							if (elm.id == el.id) {
								this.menus.push(el)
							}
						}
					)


				}
			}
		)
	}




	initListners() {

		document.body.addEventListener('click', () => this.resetTime());
		document.body.addEventListener('mouseover', () => this.resetTime());
		document.body.addEventListener('mouseout', () => this.resetTime());
		document.body.addEventListener('keydown', () => this.resetTime());
		document.body.addEventListener('keyup', () => this.resetTime());
		document.body.addEventListener('keypress', () => this.resetTime());

	}

	resetTime() {
		this.authService.resetTime()

	}


	ngOnDestroy() {
		// this._router.unsubscribe();
	}

	/**
	  *As router outlet will emit an activate event any time a new component is being instantiated.
	  */

	onActivate(e, scrollContainer) {
		scrollContainer.scrollTop = 0;
	}

	/**
	  * toggleFullscreen method is used to show a template in fullscreen.
	  */
	toggleFullscreen() {
		if (screenfull.isEnabled) {
			screenfull.toggle();
			this.isFullscreen = !this.isFullscreen;
		}
	}

	/**
	  * customizerFunction is used to open and close the customizer.
	  */
	customizerFunction() {
		this.customizerIn = !this.customizerIn;
	}

	/**
	  * addClassOnBody method is used to add a add or remove class on body.
	  */
	addClassOnBody(event) {
		var body = document.body;
		if (event.checked) {
			body.classList.add("dark-theme-active");
		} else {
			body.classList.remove('dark-theme-active');
		}
	}

	/**
	  * changeRTL method is used to change the layout of template.
	  */
	changeRTL(isChecked) {
		if (isChecked) {
			this.layout = "rtl"
		}
		else {
			this.layout = "ltr"
		}
	}

	/**
	  * toggleSidebar method is used a toggle a side nav bar.
	  */

	toggleSidebar() {
		this.coreService.sidenavOpen = !this.coreService.sidenavOpen;
		// console.log(this.coreService.sidenavOpen);

	}

	/**
	  * logOut method is used to log out the  template.
	  */

	logOut() {
		this.authService.logOut();
		// this.router.navigate(['/session'])
	}

	/**
	  * onDelete function is used to open the delete dialog.
	  */

	onDelete(cart) {
		// this.ecommerceService.deleteDialog("Are you sure you want to delete this product permanently?")
		// 	.subscribe(res=> {this.popupDeleteResponse = res},
		// 		err => console.log(err),
		// 		() => this.getPopupDeleteResponse(this.popupDeleteResponse,cart)
		// 	);
	}

	/**
	  * getPopupDeleteResponse is used to delete the cart item when reponse is yes.
	  */
	getPopupDeleteResponse(response: any, cart) {
		if (response == "yes") {
			// this.ecommerceService.localStorageDelete(cart,'cartProduct');
		}
	}

	/**
	  * sidebarFilter function filter the color for sidebar section.
	  */
	sidebarFilter(selectedFilter) {
		for (var i = 0; i < this.sideBarFilterClass.length; i++) {
			document.getElementById('main-app').classList.remove(this.sideBarFilterClass[i].colorSelect);
			if (this.sideBarFilterClass[i].colorSelect == selectedFilter.colorSelect) {
				document.getElementById('main-app').classList.add(this.sideBarFilterClass[i].colorSelect);
			}
		}
		document.querySelector('.radius-circle').classList.remove('radius-circle');
		document.getElementById(selectedFilter.sideBarSelect).classList.add('radius-circle');
	}

	/**
	  * headerFilter function filter the color for header section.
	  */
	headerFilter(selectedFilter) {
		for (var i = 0; i < this.headerFilterClass.length; i++) {
			document.getElementById('main-app').classList.remove(this.headerFilterClass[i].colorSelect);
			if (this.headerFilterClass[i].colorSelect == selectedFilter.colorSelect) {
				document.getElementById('main-app').classList.add(this.headerFilterClass[i].colorSelect);
			}
		}
		document.querySelector('.radius-active').classList.remove('radius-active');
		document.getElementById(selectedFilter.headerSelect).classList.add('radius-active');
	}

	/**
	  *chatMenu method is used to toggle a chat menu list.
	  */
	chatMenu() {
		document.getElementById("gene-chat").classList.toggle("show-chat-list");
	}

	/**
	  * onChatOpen method is used to open a chat window.
	  */
	onChatOpen() {
		document.getElementById('chat-open').classList.toggle('show-chat-window');
	}

	/**
	  * onChatWindowClose method is used to close the chat window.
	  */
	chatWindowClose() {
		document.getElementById("chat-open").classList.remove("show-chat-window");
	}

	collapseSidebar(event) {
		if (event.checked) {
			this.coreService.collapseSidebar = true;
		} else {
			this.coreService.collapseSidebar = false;
		}
	}

	//onResize method is used to set the side bar according to window width.
	onResize(event) {
		this.windowSize = event.target.innerWidth;
		this.resizeSideBar();
	}

	//customizeSidebar method is used to change the side bar behaviour.
	customizeSidebar() {
		if ((this.url === '/dashboard/courses' || this.url === '/courses/courses-list' || this.url === '/courses/course-detail' || this.url === '/ecommerce/shop' || this.url === '/ecommerce/checkout' || this.url === '/ecommerce/invoice') && this.windowSize < 1920) {
			this.coreService.sidenavMode = 'over';
			this.coreService.sidenavOpen = false;
			if (!(document.getElementById('main-app').classList.contains('sidebar-overlay'))) {
				document.getElementById('main-app').className += " sidebar-overlay";
			}

		}
		else if ((window.innerWidth > 1200) && (this.url == '/dashboard/crypto' || this.url == '/crypto/marketcap' || this.url == '/crypto/wallet' || this.url == '/crypto/trade')) {
			this.collapseSidebarStatus = this.coreService.collapseSidebar;
			if ((this.collapseSidebarStatus == false) && (window.innerWidth > 1200)) {
				document.getElementById('main-app').className += ' collapsed-sidebar';
				this.coreService.collapseSidebar = true;
				this.coreService.sidenavOpen = true;
				this.coreService.sidenavMode = 'side';
				document.getElementById('main-app').classList.remove('sidebar-overlay');
			}
		}
		else if ((window.innerWidth > 1200) && !(this.url === '/dashboard/courses' || this.url === '/courses/courses-list' || this.url === '/courses/course-detail' || this.url === '/ecommerce/shop' || this.url === '/ecommerce/checkout' || this.url === '/ecommerce/invoice')) {
			this.coreService.sidenavMode = 'side';
			this.coreService.sidenavOpen = true;
			//for responsive
			var main_div = document.getElementsByClassName('app');
			for (let i = 0; i < main_div.length; i++) {
				if (main_div[i].classList.contains('sidebar-overlay')) {
					document.getElementById('main-app').classList.remove('sidebar-overlay');
				}
			}
		}
		//for responsive
		else if (window.innerWidth < 1200) {
			this.coreService.sidenavMode = 'over';
			this.coreService.sidenavOpen = false;
			var main_div = document.getElementsByClassName('app');
			for (let i = 0; i < main_div.length; i++) {
				if (!(main_div[i].classList.contains('sidebar-overlay'))) {
					document.getElementById('main-app').className += " sidebar-overlay";
				}
			}
		}
	}

	//To resize the side bar according to window width.
	resizeSideBar() {
		if (this.windowSize < 1200) {
			this.isMobileStatus = true;
			this.isMobile = this.isMobileStatus;
			this.coreService.sidenavMode = 'over';
			this.coreService.sidenavOpen = false;
			//for responsive
			var main_div = document.getElementsByClassName('app');
			for (let i = 0; i < main_div.length; i++) {
				if (!(main_div[i].classList.contains('sidebar-overlay'))) {
					if (document.getElementById('main-app')) {
						document.getElementById('main-app').className += " sidebar-overlay";
					}
				}
			}
		}
		else if ((this.url === '/dashboard/courses' || this.url === '/courses/courses-list' || this.url === '/courses/course-detail' || this.url === '/ecommerce/shop' || this.url === '/ecommerce/checkout' || this.url === '/ecommerce/invoice') && this.windowSize < 1920) {
			this.customizeSidebar();
		}
		else {
			this.isMobileStatus = false;
			this.isMobile = this.isMobileStatus;
			this.coreService.sidenavMode = 'side';
			this.coreService.sidenavOpen = true;
			//for responsive
			var main_div = document.getElementsByClassName('app');
			for (let i = 0; i < main_div.length; i++) {
				if (main_div[i].classList.contains('sidebar-overlay')) {
					document.getElementById('main-app').classList.remove('sidebar-overlay');
				}
			}
		}
	}

	changePassword() {
		this.router.navigate(['/main/admin/change-password']);
	}








}