import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-error',
  standalone: true,
  imports: [],
  templateUrl: './modal-error.component.html',
  styleUrl: './modal-error.component.css',
})
export class ModalErrorComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private router: Router
  ) {}

  onClose(): void {
    this.dialogRef.close();
    console.log(this.data.message);
    // if (this.data.message === 'Erro ao logar') {
    //   this.router.navigate(['/']);
    // }
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }
}
