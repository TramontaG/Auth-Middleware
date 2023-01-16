import express, { RequestHandler } from 'express';
import cookieparser from 'cookie-parser';
import { Permission } from '../models';
import AuthAPI from '../API';
import { DefaultError } from '../models/Errors';

const createJWTMiddleware = (baseURL: string) => {
	const API = new AuthAPI(baseURL);

	return (perms: Permission[]): RequestHandler[] => {
		const jwtMiddleware: RequestHandler = async (req, res, next) => {
			try {
				const jwt: string = req.get('jwt') || req.cookies.jwt;
				await API.getAuth(jwt, perms);
				next();
			} catch (e: DefaultError | unknown) {
				if (!isDefaultError(e)) {
					return res.status(500).send();
				}
				res.status(e.status).send(e.message);
			}
		};

		return [express.json(), cookieparser(), jwtMiddleware];
	};
};

const isDefaultError = (e: DefaultError | unknown): e is DefaultError => {
	const maybeDefaultError = e as DefaultError;
	if (maybeDefaultError.status && maybeDefaultError.message) {
		return true;
	}
	return false;
};

export default createJWTMiddleware;
