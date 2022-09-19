import { setupServer } from 'msw/native'
import { handlers } from './serverHandler';

const server = setupServer(...handlers);

export default server;
