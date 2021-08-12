/**
* @file Basic structure for "Alert" dialog boxes
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
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit {

  message: string = '';
  closeText: string = 'Fermer';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AlertComponent>
  ) {
    if(data) {
      this.message = data.message || this.message;
      if(data.buttonText) {
        this.closeText = data.buttonText.cancel || this.closeText;
      }
    }
    this.dialogRef.updateSize('300vw', '300vw');
  }

  ngOnInit(): void {
  }

  /*--------------------------------------------------------------------*/

  /** 
  * Manages closure.
  */
  onConfirm(): void {
    this.dialogRef.close(true);
  }

}
