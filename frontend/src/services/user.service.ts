import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public usersUrl =  'http://localhost:9428/api/users/';
  public curentUser: User;
  constructor(private http: HttpClient) {
  }

  createUser(user: User) {
    this.http.post<User>('http://localhost:9428/api/users',  user).subscribe(
      (res) => user.id = res.id,
      (err) => console.log(err)
    );
  }

  setCurrentUser() {
    this.curentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
}
