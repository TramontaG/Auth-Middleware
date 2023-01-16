import express, { RequestHandler } from 'express';
import cookieparser from 'cookie-parser';
import { Permission } from 'src/models';

export const useJWT = (perms: Permission[]): RequestHandler[] => {
	const jwtMiddleware: RequestHandler = (req, res, next) => {
		try {
			next();
		} catch (e) {
			res.status(403).send();
		}
	};

	return [express.json(), cookieparser(), jwtMiddleware];
};
