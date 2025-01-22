import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, MatButton],
})
export class LoginComponent {
    user = {
        email: '',
        password: ''
    };

    constructor(private dialogRef: MatDialogRef<LoginComponent>) { }

    onLogin(): void {
        console.log('User:', this.user);
        this.dialogRef.close();
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
