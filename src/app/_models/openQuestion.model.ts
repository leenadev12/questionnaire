import { questionTypes } from './questionTypes.model';

export interface openQuestion {
  questionType: questionTypes;
  title: string;
  answer: string;
  createTime: string;
}
