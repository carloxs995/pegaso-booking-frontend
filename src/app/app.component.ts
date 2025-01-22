import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
    title = 'pegaso-booking';

    ngOnInit(): void {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, '', '')
            .then((userCredential) => console.log(userCredential.user))
            .catch((error) => console.error(error));
    }
}
