import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalErrorComponent } from '../modal/modal-error/modal-error.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private dialog: MatDialog, private router: Router) {}

  openErrorModal(message: string, page: string) {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      data: { message },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate([`/${page}`]);
    });
  }
}
