import { Component, inject, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from '../../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatDialogModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButton,
        MatProgressSpinner,
        CommonModule,
        ReactiveFormsModule,
        MatSnackBarModule
    ],
    animations: [
        trigger('formTransition', [
            state('login', style({
                transform: 'translateX(0)',
                opacity: 1
            })),
            state('signup', style({
                transform: 'translateX(0)',
                opacity: 1
            })),
            transition('login <=> signup', [
                style({ opacity: 0, transform: 'translateY(-20px)' }),
                animate('300ms ease-in-out')
            ])
        ])
    ]
})
export class LoginComponent {
    isSignUp: boolean = false;
    isLoading: boolean = false;

    authForm: FormGroup<any> = new FormGroup<any>(
        {
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            confirmPassword: new FormControl(''),
            firstName: new FormControl('', Validators.minLength(3)),
            lastName: new FormControl('', Validators.minLength(3))
        },
    );

    private readonly dialogRef = inject(MatDialogRef<LoginComponent>);
    private readonly authenticationService = inject(AuthenticationService);
    readonly snackBar = inject(MatSnackBar);

    passwordMatchValidator(formGroup: AbstractControl) {
        const password = formGroup.get('password')?.value;
        const confirmPassword = formGroup.get('confirmPassword')?.value;
        return password === confirmPassword ? null : { passwordMismatch: true };
    }

    onLogin() {
        if (this.authForm.valid) {
            this.isLoading = true;

            this.authenticationService.loginWithEmail({
                username: this.authForm.get('email')?.value,
                password: this.authForm.get('password')?.value
            }).subscribe({
                next: res => {
                    this.isLoading = false;
                    console.log('User:', res);
                    this.dialogRef.close();
                },
                error: err => {
                    this.isLoading = false;
                    this.snackBar.open('Credenziali non valide!', 'Chiudi', { duration: 5000 })
                    console.log(err?.message);
                }
            })
        }
    }

    onRegister() {
        if (this.authForm.valid) {
            this.isLoading = true;
            this.authenticationService.createUser(this.authForm.value)
                .subscribe({
                    next: () => {
                        this.isLoading = false;
                        this.dialogRef.close();
                    },
                    error: () => {
                        this.isLoading = false;
                        this.snackBar.open('Registrazione fallita!', 'Chiudi', { duration: 5000 })
                    }
                })
        }
    }

    onCancel() {
        this.dialogRef.close();
    }

    toggleSignUp() {
        this.isSignUp = !this.isSignUp;
        if (this.isSignUp) {
            this.authForm.get('confirmPassword')?.addValidators([Validators.required]);
            this.authForm.get('firstName')?.addValidators([Validators.required, Validators.minLength(3)]);
            this.authForm.get('lastName')?.addValidators([Validators.required, Validators.minLength(3)]);
            this.authForm.addValidators(this.passwordMatchValidator)
        } else {
            this.authForm.get('confirmPassword')?.clearValidators();
            this.authForm.get('firstName')?.clearValidators();
            this.authForm.get('lastName')?.clearValidators();
            this.authForm.removeValidators(this.passwordMatchValidator)
        }
        this.authForm.updateValueAndValidity();
    }
}
