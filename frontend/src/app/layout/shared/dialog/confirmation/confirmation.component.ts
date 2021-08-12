/**
* @file Basic structure for "Confirm" dialogue boxes
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @license GNU_General_Public_License_v3.0
*/
/**
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})

export class ConfirmationComponent implements OnInit {
  message: string = "Etes-vous sûr ?";
  confirmButtonText = "Oui";
  cancelButtonText = "Annuler";

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any, 
    private dialogRef: MatDialogRef<ConfirmationComponent>) {
      if(data) {
        this.message = data.message || this.message;
        if (data.buttonText) {
          this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
          this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
        }
      }
  }

  ngOnInit(): void { }

  /*--------------------------------------------------------------------*/

  /** 
  * Manages closure.
  */
  onConfirm(): void {
    this.dialogRef.close(true);
  }
  
}