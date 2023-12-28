<div *ngFor="let contact of contactList">
     <div *ngIf="false"> <!-- Only show if validated data is present -->
        <div class="contactInfoWrapper"> <!-- Add unique ID to each contact card -->
            <div class="contactInfoDescriptionWrapper">
                <div class="contactInfoThumbnail">
                    <!-- Render user image -->
                </div>
                <div class="contactInfoText">
                    <!-- Render user information -->
                </div>
            </div>
        </div>
    </div>
</div>
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-contact-list',
  templateUrl: './user-contact-list.component.html',
})
export class UserContactListComponent {
  @Input()
  contactList: Array<any> | [] = [];
  @Input()
  listId: string = '';
}