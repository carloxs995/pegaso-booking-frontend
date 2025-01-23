import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from '../../../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, MatButton, MatProgressSpinner, CommonModule],
})
export class LoginComponent {
    user = {
        email: '',
        password: ''
    };

    isLoading: boolean = false;

    constructor(
        private readonly dialogRef: MatDialogRef<LoginComponent>,
        private readonly authenticationService: AuthenticationService
    ) { }

    onLogin(): void {
        this.isLoading = true;

        this.authenticationService.loginWithEmail({
            username: this.user.email,
            password: this.user.password
        }).subscribe(res => {
            this.isLoading = false;
            console.log('User:', res);
            this.dialogRef.close();
        })
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
