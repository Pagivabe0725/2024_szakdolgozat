import { Timestamp } from '@angular/fire/firestore';

export interface user {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: 'Férfi' | 'Nő'
  telNumber: string;
  lastLogin: Timestamp;
  city: string | undefined;
  dateOfRegistration: Timestamp;
}
