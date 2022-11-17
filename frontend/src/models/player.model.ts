import {QuizGame} from './quizgame';

export interface Player {
  id: number;
  name: string;
  surname: string;
  age: number;
  quizGames: QuizGame[];
  userId: number;
}
