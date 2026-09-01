import { SquareClient, SquareEnvironment } from 'square';
import { ENV } from '~/constants';

export const squareClient = new SquareClient({ 
    token: ENV.SQUARE_TOKEN, 
    environment: ENV.NODE_ENV === "production" ? SquareEnvironment.Production : SquareEnvironment.Sandbox
});