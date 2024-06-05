import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authenticateJWT } from '../routers/middleware/userAuth';

jest.mock('jsonwebtoken');

describe('authenticateJWT', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            header: jest.fn().mockReturnValue('Bearer token')
        };
        res = {
            sendStatus: jest.fn()
        };
        next = jest.fn();
    });

    it('should call next if token is valid', () => {
        (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
            callback(null, { username: 'testuser' });
        });

        authenticateJWT(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
        expect(res.sendStatus).not.toHaveBeenCalled();
    });

    it('should return 403 if token is invalid', () => {
        (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
            callback(new Error('Invalid token'), null);
        });

        authenticateJWT(req as Request, res as Response, next);

        expect(res.sendStatus).toHaveBeenCalledWith(403);
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 if token is not provided', () => {
        req.header = jest.fn().mockReturnValue(null);

        authenticateJWT(req as Request, res as Response, next);

        expect(res.sendStatus).toHaveBeenCalledWith(403);
        expect(next).not.toHaveBeenCalled();
    });
});
