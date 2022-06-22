import {
  addBookHandler,
} from './handlers';

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
];

export default routes;
