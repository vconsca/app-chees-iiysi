import { subDays, subHours, subMinutes, subSeconds } from 'date-fns';

const now = new Date();

export const players = [
  {
    id: '5e887ac47eed253091be10cb',
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    city: 'Vigo',
    country: 'Spain',
    email: 'vconsca@gmail.com',
    name: 'Víctor Constenla',
    state: 'Pontevedra',
    street: 'Ronda de Don Bosco',
    updatedAt: subDays(subHours(now, 7), 1).getTime(),
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    avatar: '/assets/avatars/avatar-fran-perez.png',
    city: 'Ourense',
    country: 'USA',
    email: 'fran.perez@devias.io',
    name: 'Fran Perez',
    state: 'Ourense',
    street: 'Rúa do Progreso',
    updatedAt: subDays(subHours(now, 1), 2).getTime(),
  }
];


