import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private url = 'http://localhost:9000/api/'
    public currentUser: any;
    public currentUserToken = '';
    public currentUserRole = localStorage.getItem('userRole');
    public lastRouteUsed = localStorage.getItem('lastRouteUsed');
    public selectedBuses;

    constructor(
        private http: HttpClient,
        private routerService: Router
    ) {}

    changeBusses(busses) {
        
    }

    loginUser(loginObject) {
        return this.http.post(this.url + 'login', loginObject).toPromise();
    }

    logoutUser() {
        delete this.currentUser;
        delete this.currentUserToken;
        delete this.currentUserRole;
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('userRole')
        localStorage.removeItem('lastRouteUsed')
        this.routerService.navigate(['/'])
    }

    saveUser(user) {
        const userObj = user.user;
        this.getDataObjectById('users', userObj.userId).then( data => {
            this.currentUser = data;
            this.currentUserToken = userObj.token;
            this.currentUserRole = data['role'];
            localStorage.setItem("token",  userObj.token);
            localStorage.setItem("userId",  userObj.userId);
            localStorage.setItem("userRole",  data['role']);
        }).then(data => {
            console.log(this.currentUserRole)
            this.routerService.navigate(['/home'])})
    }

    checkAuth() {
        this.getToken(localStorage.getItem('token')).then( data => {
            if (!data) {
                this.routerService.navigate(['/'])
            } else {
                this.currentUserRole = localStorage.getItem('userRole')
                this.routerService.navigate(['/home'])
            }
        })
    }

    getUserRole() {
        return this.currentUserRole
    }

    getToken(token) {
        return this.http.get(this.url + 'login/' + token).toPromise();
    }

    getDataObject(model) {
        return this.http.get(this.url + model).toPromise();
    }

    getDataObjectById(model, id) {
        return this.http.get(this.url + model + '/' + id).toPromise();
    }

    getDataObjectFiltered(model, filter) {
        console.log(filter)
        return this.http.get(this.url + model + '?' + JSON.stringify(filter)).toPromise();
    }

    addDataObject(model, object) {
        return this.http.post(this.url + model, object).toPromise();
    }

    editDataObject(model, object, id) {
        return this.http.put(this.url + model + '/' + id, object).toPromise();
    }

    deleteDataObject(model, id) {
        return this.http.delete(this.url + model + '/' + id).toPromise();
    }
}