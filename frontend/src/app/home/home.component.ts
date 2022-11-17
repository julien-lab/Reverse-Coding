import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {QuizService} from '../../services/quiz.service';
import {PlayerService} from '../../services/player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public currentUser: User;
  constructor(public quizService: QuizService, public playerService: PlayerService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.quizService.setQuizzesFromUrl();
    this.playerService.setPlayersFromUrl();
  }

  ngOnInit() {
  }


}
