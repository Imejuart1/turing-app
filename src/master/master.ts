import { Component, OnInit } from '@angular/core';
import { BluetoothSyncAPIService } from '../services/bluetooth-sync-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BluetoothSyncAPIService],
})
export class AppComponent implements OnInit {
  /**
   * Set the Property for App Component
   */

  // Full list
  public contactList: Array<any> | [] = [];
  // Current page list
  public currentPageList: Array<any> | [] = [];
  // Filtered page list
  public filteredList: Array<any> | [] = [];
  // Offset per page
  public offset: number = 0;
  // Count per page
  public count: number = 5;
  // Current page number
  public page: number = 0;
  // Total page number
  public totalPages: number = 0;
  // The total os records
  public total: number = 0;
  // Property that holds the value to indicate if the next page will be available or not
  public isLastPage: boolean = false;
  // Property that holds the value to indicate if the previous page will be available or not
  public isFirstPage: boolean = false;
  // Holds the value is the api is syncing or not
  public isSyncing: boolean = false;
  // Property holds the value of api retry count
  public retryCount: number = 0;
  // Property holds the value of api any error
  public error: string = '';
  public listId: string = 'page';

  /**
   * Called first time before the ngOnInit()
   */
  constructor(private bluetoothSyncService: BluetoothSyncAPIService) {}

  /**
   * ngOnInit Called after the constructor and called  after the first
   */
  ngOnInit() {
    this.total = this.filteredList.length;

    this.isLastPage = this.offset + this.count >= this.filteredList.length;
    this.isFirstPage = this.offset < this.count;

    if (this.retryCount === 2) {
      // Hint: Set error message and ensure API call is not triggered.
    }

    if (this.retryCount !== 0 && this.retryCount < 3) {
      // Hint: Call BluetoothSyncAPI service for 3 tries
    }
  }

  /**
   * Update Property State of App component
   * if the offset plus count is less than the length of the list
   * Fix the updatePropertyState if have any error
   */
  updatePropertyState() {
    this.page =
      this.offset > 0
        ? this.offset / this.count + 1
        : this.filteredList.length > 0
        ? 1
        : 0;

    this.totalPages =
      this.filteredList.length > 0
        ? Math.ceil(this.filteredList.length / this.count)
        : 0;

    this.total = this.filteredList.length;
    this.currentPageList = this.filteredList.slice(
      this.offset,
      this.offset + this.count
    );
    this.isLastPage = this.offset + this.count >= this.filteredList.length;
    this.isFirstPage = this.offset < this.count;
  }

  /**
   * Call next page
   */
  nextPage() {
    if (this.offset + this.count < this.contactList.length) {
      // Hint: update the offset to go to next page
      this.updatePropertyState();
    }
  }

  /**
   * Call previous page
   */
  prevPage() {
    if (this.offset - this.count >= 0) {
      // Hint: update the offset to go to previous page
      this.updatePropertyState();
    }
  }

  /**
   * Call the filter on search and get the updated list
   */
  onFilter(term: any) {
    if (!term.target.value) {
      // Reseting the offset and setting contactlist to initial data as search value is blank
      this.filteredList = this.contactList;
      this.offset = 0;
    } else {
      // filter the list and update data & offset accordingly
      const newList = this.contactList;

    }
    this.updatePropertyState();
  }

  /**
   * Call the Bluetooth API and update the list
   */
  async sync() {
    this.isSyncing = true;
    try {
      const user = await this.bluetoothSyncService.sync();
      const filterUser = user?.results.map((r: any) => ({
        name: r.name.first,
        thumbnail: r.picture.thumbnail,
        email: r.email,
        phone: r.phone,
        id: ${r.id.name}-${r.id.value},
      }));

      this.contactList = [...filterUser];
      this.filteredList = [...filterUser];
      this.offset = 0;
    } catch (err) {
      // Hint: Catch the error, and implement logic to retry 3 times.
    } finally {
      this.isSyncing = false; //set isSyncing to false
    }
    this.updatePropertyState(); //update property state after all other operations have been completed
  }
}