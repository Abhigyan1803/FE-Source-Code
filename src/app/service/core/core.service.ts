import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
// import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})

export class CoreService {

	collapseSidebar 		 : boolean = false;
	collapseSidebarStatus : boolean;
	sidenavMode				 : string  = "side";
	sidenavOpen 			 : boolean = true;
	horizontalSideNavMode : string  = "over";
	horizontalSideNavOpen : boolean = false;
	projectDetailsContent : any;
	editProductData 		 : any;

	constructor(private matDialog : MatDialog,
					private http : HttpClient){
	}

	//addNewUserDailog function is used to open Add New user Dialog Component.
	//getProjectContent method is used to get the  Json file for crm project component.
	getProjectContent () {
		return this.http.get('assets/data/crm_projects.json').pipe(map(response => response));
	}

	//getCoinList method is used to get the coin list section data from json file
	getCoinList (){
		return this.http.get('assets/data/coin_list.json').pipe(map(response => response));
	}

	//getMarketCap method is used to get the market cap  data from json file
	getMarketCap(){
		return this.http.get('assets/data/market_cap.json').pipe(map(response => response));
	}

	//getTickerData method is used to get the ticker data from json file
	getTickerData(){
		return this.http.get('assets/data/ticker.json').pipe(map(response => response));
	}

	//getTableTabContent method is used to get the table tab data from json file
	getTableTabContent(){
		return this.http.get('assets/data/table_tab_list.json').pipe(map(response => response));
	}

	//getCrmStatsCardContent method is used to get the Crm stats card data from json file
	getCrmStatsCardContent(){
		return this.http.get('assets/data/crm_stats_card.json').pipe(map(response => response));
	}

	//getCryptoStatsCardContent method is used to get the CRYPTO stats card data from json file
	getCryptoStatsCardContent(){
		return this.http.get('assets/data/crypto_stats_card.json').pipe(map(response => response));
	}

	//getSafeTradeContent method is used to get the safe trade data from json file
	getSafeTradeContent(){
		return this.http.get('assets/data/safe_trade.json').pipe(map(response => response));
	}

	//getExchangeStatisticsContent method is used to get the Exchange Statistics data from json file
	getExchangeStatisticsContent(){
		return this.http.get('assets/data/exchange_statistics.json').pipe(map(response => response));
	}

	//getProductContent method is used to get the product data from json file
	getProductContent(){
		return this.http.get('assets/data/products.json').pipe(map(response => response));
	}

	//getWalletContent method is used to get the wallet data from json file
	getWalletContent(){
		return this.http.get('assets/data/wallet.json').pipe(map(response => response));
	}


	//getChatContent method is used to get the chat data from json file
	getChatContent(){
		return this.http.get('assets/data/chat.json').pipe(map(response => response));
	}

	//getTradeHistoryContent method is used to get the trade history data from json file
	getTradeHistoryContent(){
		return this.http.get('assets/data/trade_history.json').pipe(map(response => response));
	}

	//getRecentTradeContent method is used to get the recent trade data from json file
	getRecentTradeContent(){
		return this.http.get('assets/data/recent_trade.json').pipe(map(response => response));
	}

	//getLiveChatContent method is used to get the live chat support data from json file
	getLiveChatContent(){
		return this.http.get('assets/data/live_chat_support.json').pipe(map(response => response));
	}

	//getInvoiceListContent method is used to get the live chat support data from json file
	getInvoiceListContent(){
		return this.http.get('assets/data/invoice_list.json').pipe(map(response => response));
	}

	//getPaymentList method is used to get the payment list data from json file
	getPaymentList(){
		return this.http.get('assets/data/payment_list.json').pipe(map(response => response));
	}

	//getTaxRateList method is used to get the tax rate list data from json file
	getTaxRateList(){
		return this.http.get('assets/data/tax_rate_list.json').pipe(map(response => response));
	}

	//getTicketList method is used to get the add ticket list data from json file
	getTicketList(){
		return this.http.get('assets/data/add_ticket_list.json').pipe(map(response => response));
	}

	//getAboutService method is used to get the about service data from json file
	getAboutService(){
		return this.http.get('assets/data/about_service.json').pipe(map(response => response));
	}

	//getUserManagementList method is used to get the User Management list data from json file
	getUserManagementList(){
		return this.http.get('assets/data/user_management_list.json').pipe(map(response => response));
	}

	//getUserList method is used to get the User list data from json file
	getUserList(){
		return this.http.get('assets/data/user_list.json').pipe(map(response => response));
	}

	//getTaskboardContent method is used to get the taskboard data from json file
	getTaskboardContent(){
		return this.http.get('assets/data/taskboard.json').pipe(map(response => response));
	}

	//getMaterialIcons method is used to get the material icons data from json file
	getMaterialIcons(){
		return this.http.get('assets/data/material_icons.json').pipe(map(response => response));
	}

	//getResponsiveTableContent method is used to get the responsive table data from json file
	getResponsiveTableContent(){
		return this.http.get('assets/data/responsive_table.json').pipe(map(response => response));
	}

	//getResponsiveTableContent method is used to get the user management grid list data from json file
	getUserManagementGridList(){
		return this.http.get('assets/data/user_management_grid_list.json').pipe(map(response => response));
	}

	//getContactListContent method is used to get the contact list data from json file
	getContactListContent(){
		return this.http.get('assets/data/contacts.json').pipe(map(response => response));
	}
}