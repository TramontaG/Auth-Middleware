import axios, { AxiosError, AxiosInstance } from 'axios';
import { Permission } from '../models';
import { Unauthorized, BadRequest, Forbidden, ServerError } from '../models/Errors';

class AuthAPI {
	instance: AxiosInstance;
	constructor(baseURL: string) {
		this.instance = axios.create({
			baseURL,
		});
	}

	async getAuth(jwt: string, requestedPerms: Permission[]) {
		try {
			const response = await this.instance.post('/jwt', {
				perms: requestedPerms,
				jwt,
			});
			return response;
		} catch (e: AxiosError | unknown) {
			if (isAxiosError(e)) {
				if (e.response?.status === 401) {
					throw errors.unauthorized;
				}
				if (e.response?.status === 402) {
					throw errors.badRequest;
				}
				if (e.response?.status === 403) {
					throw errors.forbidden;
				}
				throw errors.serverError;
			}
			throw errors.serverError;
		}
	}
}

type Errors = {
	unauthorized: Unauthorized;
	badRequest: BadRequest;
	forbidden: Forbidden;
	serverError: ServerError;
};
const errors: Errors = {
	unauthorized: {
		status: 401,
		message: 'Unauthorized: you dont have permission to use this route',
	},
	badRequest: {
		status: 402,
		message: 'Bad request: please provide jwt and a permission array',
	},
	forbidden: {
		status: 403,
		message: 'Forbidden: your jwt is invalid or expired',
	},
	serverError: {
		status: 500,
		message: 'Server Error',
	},
};

/**
 * It will always be an axios error;
 * @param e
 * @returns
 */
const isAxiosError = (e: AxiosError | unknown): e is AxiosError => {
	return true;
};

export default AuthAPI;
