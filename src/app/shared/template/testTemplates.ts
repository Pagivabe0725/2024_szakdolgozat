import { Timestamp } from '@angular/fire/firestore';
import { forum } from '../interfaces/forum';
import { user } from '../interfaces/user';
import { forumComment } from '../interfaces/forumComment';
import { Dialog } from '../interfaces/dialog';
import { work } from '../interfaces/work';

export const forumTemplate: forum = {
  title: 'first',
  id: '1',
  userId: '1',
  text: 'It is a test text',
  author: 'Tester',
  date: Timestamp.now(),
  commentsIdArray: [],
  dislikeArray: [],
  likeArray: [],
  category: 'something',
};

export const userTemplate: user = {
  id: 'UserId',
  firstName: 'firstName',
  lastName: 'lastName',
  lastLogin: Timestamp.now(),
  email: 'test@gmail.com',
  city: undefined,
  telNumber: '06905777170',
  dateOfRegistration: Timestamp.now(),
  gender: 'Férfi',
};

export const commentTemplate: forumComment = {
  content: 'something',
  id: '1',
  userid: '1',
  author: 'Tester',
  date: Timestamp.now(),
};

export const dialogTemplate: Dialog = {
  width: '70%',
  height: '70%',
  hostComponent: 'ForumElementInfoComponent',
  title: '',
  content: '',
  action: false,
  hasInput: false,
};

export const workTemplate: work = {
  id: 'workId',
  userId: '1',
  name: 'first work',
  author: userTemplate,
  created: Timestamp.now(),
  modified: Timestamp.now(),
  finished: false,
  members: ['2', '3'],
  elements:[]
};

export const accountButtonActionsTemplate: Array<string> = [
  'password',
  'lastName',
  'firstName',
  'email',
  'gender',
  'telNumber',
  'city',
  'lastLogin',
  'dateOfRegistration',
  'back',
];

