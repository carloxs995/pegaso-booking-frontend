import { Injectable, InjectionToken, Injector, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const SIDENAV_DATA = new InjectionToken<any>('SIDENAV_DATA');

@Injectable({
    providedIn: 'root'
})
export class SidenavService {
    private sidenavOpenSubject = new BehaviorSubject<boolean>(false);
    private sidenavTitleSubject = new BehaviorSubject<string>('');
    private sidenavContentSubject = new BehaviorSubject<Type<any> | null>(null);
    private sidenavDataSubject = new BehaviorSubject<any>(null);
    private sidenavInjectorSubject = new BehaviorSubject<any>(null);

    isSidenavOpen$ = this.sidenavOpenSubject.asObservable();
    sidenavTitle$ = this.sidenavTitleSubject.asObservable();
    sidenavContent$ = this.sidenavContentSubject.asObservable();
    sidenavData$ = this.sidenavDataSubject.asObservable();
    sidenavInjectorSubject$ = this.sidenavInjectorSubject.asObservable();

    constructor(private injector: Injector) { }

    openSidenav(content: Type<any>, data: any) {
        const customInjector = Injector.create({
            providers: [
                { provide: SIDENAV_DATA, useValue: data }
            ],
            parent: this.injector
        });

        this.sidenavTitleSubject.next('');
        this.sidenavContentSubject.next(content);
        this.sidenavOpenSubject.next(true);
        this.sidenavInjectorSubject.next(customInjector);
        this.sidenavDataSubject.next(data);
    }

    closeSidenav() {
        this.sidenavOpenSubject.next(false);
        this.sidenavTitleSubject.next('');
        this.sidenavContentSubject.next(null);
        this.sidenavContentSubject.next(null);
        this.sidenavInjectorSubject.next(null);
    }
}
