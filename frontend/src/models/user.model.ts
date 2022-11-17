import {Player} from './player.model';
import {Quiz} from './quiz.model';

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;

  token?: string;
}
