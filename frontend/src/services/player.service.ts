import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Player} from '../models/player.model';
import {BehaviorSubject} from 'rxjs';
import {UserService} from './user.service';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private players: Player[];
  public players$: BehaviorSubject<Player[]> = new BehaviorSubject(this.players);

  constructor(private http: HttpClient, private userService: UserService) {
    this.setPlayersFromUrl();
    this.setUserFromUrl();
  }

  setPlayersFromUrl() {
    this.userService.setCurrentUser();
    this.http.get<Player[]>(this.userService.usersUrl + this.userService.curentUser.id + '/players').subscribe((players) => {
      this.players = players;
      this.players$.next(this.players);
      console.log(this.userService.curentUser.id);
      console.log(this.players);
    });
  }

  setUserFromUrl() {
    this.userService.setCurrentUser();
    this.http.get<User>(this.userService.usersUrl + this.userService.curentUser.id).subscribe((user) => {
      console.log(user);
    });
  }

  createNewPlayer(playerToCreate: Player) {
    playerToCreate.userId = this.userService.curentUser.id;
    this.players.push(playerToCreate);
    this.players$.next(this.players);
    this.http.post<Player>(this.userService.usersUrl + this.userService.curentUser.id + '/players',  playerToCreate).subscribe(
      (res) => playerToCreate.id = res.id,
      (err) => console.log(err)
    );
  }
}

