import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { CoreService } from '../../service/core/core.service';
import { HomePageService } from 'app/service/home/home-page.service';

import {FormControl, Validators} from '@angular/forms';
import { local } from 'd3';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';


const colors: any = {
	red: {
		primary: '#ad2121',
		secondary: '#FAE3E3'
	},
	blue: {
		primary: '#1e90ff',
		secondary: '#D1E8FF'
	},
	yellow: {
		primary: '#e3bc08',
		secondary: '#FDF1BA'
	}
};

@Component({
	selector: 'ms-full-calendar',
	changeDetection: ChangeDetectionStrategy.Default,
	templateUrl: './calendar-material.html',
	styleUrls: ['./calendar-material.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})

export class CalendarComponent implements OnInit {
	forcastevent: any[] = [];
	tempEv: any[] = [];
	calendarEventData: any[] = [];
	calendarOptions: CalendarEventAction;
	activeDayIsOpen: boolean = true;
	@ViewChild("modalContent") modalContent: TemplateRef<any>;
  
	view: string = "month";
	selectedSeasonTerm:string='';
	selectedYear:number=0;
	viewDate: Date = new Date();
	years = this.viewDate.getFullYear();

	modalData: {
	  action: string;
	  event: CalendarEvent;
	};
  
	refresh: Subject<any> = new Subject();

	/**
	 * actions is used to delete the event.
	 */
	actions: CalendarEventAction[] = [
	//   {
	// 	label: '<i class="fa fa-fw fa-pencil"></i>',
	// 	onClick: ({ event }: { event: CalendarEvent }): void => {
	// 	  this.handleEvent("Edited", event);
	// 	},
	//   },
	//   {
	// 	label: '<i class="fa fa-fw fa-times"></i>',
	// 	onClick: ({ event }: { event: CalendarEvent }): void => {
	// 	  this.events = this.events.filter((iEvent) => iEvent !== event);
	// 	  this.handleEvent("Deleted", event);
	// 	},
	//   },
	];
  
	/**
	 *events is used to view the events
	 */
	// events: CalendarEvent[] = [{
	// 	start: subDays(startOfDay(new Date()), 1),
	// 	end: addDays(new Date(), 1),
	// 	title: 'A 3 day event',
	// 	color: colors.red,
	// 	actions: this.actions
	// }, {
	// 	start: startOfDay(new Date()),
	// 	title: 'An event with no end date',
	// 	color: colors.yellow,
	// 	actions: this.actions
	// }, {
	// 	start: subDays(endOfMonth(new Date()), 3),
	// 	end: addDays(endOfMonth(new Date()), 1),
	// 	title: 'A long event that spans 2 months',
	// 	color: colors.blue
	// }, {
	// 	start: addHours(startOfDay(new Date()), 2),
	// 	end: new Date(),
	// 	title: 'A draggable and resizable event',
	// 	color: colors.yellow,
	// 	actions: this.actions,
	// 	resizable: {
	// 	beforeStart: true,
	// 	afterEnd: true
	// 	},
	// 	draggable: true
	// }];

	events: CalendarEvent[] = this.calendarEventData;
	
  
	constructor(
	  private modal: NgbModal,
	  private service: HomePageService,
	  private pageTitleService: PageTitleService,
	  private coreService: CoreService,
	  private cdref:ChangeDetectorRef,
	  public dialog: MatDialog,
	) {}
  
	onDateClick(res) {
	  alert("Clicked on date : " + res.dateStr);
	}
  
	ngOnInit() {
		document.getElementById('foot-id').style.position='relative';
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.pageTitleService.setTitle("Calendar");
		  }, 0);
		  
		  console.log("forecast of trg events");
		  this.getForcastEventsList();
	  
		  setTimeout(() => {
			return this.getForcastEventsList();
		  }, 2200);
	  }
  
	/**
	 * dayClicked method is used to open the active day.
	 */
	dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
		
	  if (isSameMonth(date, this.viewDate)) {
		if (
		  (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
		  events.length === 0
		) {
		  this.activeDayIsOpen = false;
		} else {
		  this.activeDayIsOpen = true;
		  this.viewDate = date;
console.log(this.viewDate,"dkk");

		}

	  }
	}
  
	/**
	 * eventTimesChanged method is used to change the calendar Event time.
	 */
	eventTimesChanged({
	  event,
	  newStart,
	  newEnd,
	}: CalendarEventTimesChangedEvent): void {
	  event.start = newStart;
	  event.end = newEnd;
	  this.handleEvent("Dropped or resized", event);
	  this.refresh.next();
	}
	djevent
	/**
	 * handleEvent method is used to handle the event and action.
	 */
	handleEvent(action: string, event: CalendarEvent): void {
	  this.modalData = { event, action };
	  this.modal.open(this.modalContent, { size: "lg" });
	  console.log(this.djevent,"dj");
	  
	}
  
	/**
	 * addEvent method is used to add a new event into calendar.
	 */
	
	addEvent(): void {
	  this.events.push({
		title: "New event",
		start: startOfDay(new Date()),
		end: endOfDay(new Date()),
		color: colors.red,
		draggable: true,
		resizable: {
		  beforeStart: true,
		  afterEnd: true,
		},
	  });
	  this.refresh.next();
	}
  
	getForcastEventsList() {
	  this.service.getForcastEventsList().subscribe((res) => {
		if (res.status == "OK") {
		  this.forcastevent = res.object;
		  console.log(this.forcastevent[0])
		  this.cdref.detectChanges();
		}
	  });
	//   console.log("juned shaikh", JSON.stringify(this.forcastevent));
	  this.forcastevent.forEach((val) => {
		let tempObj = {
		  start: new Date(val.date),
		  title: val.description,
		  color: colors.yellow,
		//   actions: this.actions,
		  Week: val.week,
		  Date: val.date,
		  Year: val.year,
		  locationImage:val.locationImage,
		  weekNumbers: true,
		  SessionTerm: val.sessionTerm
		};
		console.log(tempObj,);
		this.calendarEventData.push(tempObj);
		this.cdref.detectChanges();
		this.refresh.next();
	  });
	}

	noImg(e:any){
		e.target.src="assets/img/id.png"
	  }


		seasons = ['Autumn', 'Spring'];
	year = [this.years-1, this.years, this.years+1];

	submitted = false;
	
	onSubmit() {
		console.log(this.selectedSeasonTerm);
		console.log(this.selectedYear);
		 this.submitted = true; 
		//  let tempEv:any[]=[]
		 this.calendarEventData.find(
			 element=>{
				if(element.SessionTerm == this.selectedSeasonTerm && element.Year == this.selectedYear){
					this.calendarEventData.length=0;
					this.calendarEventData.push(element);
		 this.refresh.next();
		 console.log(this.calendarEventData,"=========");  
				}
				else{
					this.calendarEventData.length=0;
				}
				
				
			 }
			 
		 )
		//  this.tempEv;
		
		 console.log(this.tempEv);
		 this.refresh.next();
		//  this.forcastevent.forEach((val) => {
		// 	let tempObj = {
		// 	  start: new Date(val.date),
		// 	  title: val.description,
		// 	  color: colors.yellow,
		// 	//   actions: this.actions,
		// 	  Week: val.week,
		// 	  Date: val.date,
		// 	  Year: val.year,
		// 	  weekNumbers: true,
		// 	  SessionTerm: val.sessionTerm
		// 	};
		// 	console.log(tempObj,"===================>");
		// 	this.tempEv.push(tempObj);
		// 	this.cdref.detectChanges();
		// 	this.refresh.next();
		//   });
		 

	}


	openDoc(e){
  
		this.dialog.open(DialogComponent,
		  {
			width: '1300px', height: '650px',
			data: {
			  type: 'document',title:"Forcast-Event Document", url: e.locationImage
			}
		  }
		  )
		}
	


}