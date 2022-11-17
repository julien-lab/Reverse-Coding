import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Player} from '../../models/player.model';
import {PlayerService} from '../../services/player.service';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.scss']
})
export class CreatePlayerComponent implements OnInit {
  newPlayerForm: FormGroup;
  linkReturn = '/select-quiz-player';
  constructor(public formBuilder: FormBuilder, private playerService: PlayerService, private router: Router) { }

  ngOnInit() {
    this.newPlayerForm = this.formBuilder.group({
      name: '',
      surname: '',
      age: '',
    });
  }

  createPlayer() {
    const playerToCreate: Player = this.newPlayerForm.getRawValue() as Player;
    playerToCreate.quizGames = [];
    console.log(playerToCreate);
    this.newPlayerForm.reset();
    this.playerService.createNewPlayer(playerToCreate);
    this.router.navigate(['select-quiz-player']);
  }
}
