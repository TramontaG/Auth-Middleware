export type DefaultError = {
	status: number;
	message: string;
};

export type BadRequest = DefaultError & {
	status: 402;
	message: `Bad request: ${string}`;
};

export type Unauthorized = DefaultError & {
	status: 401;
	message: `Unauthorized: ${string}`;
};

export type Forbidden = DefaultError & {
	status: 403;
	message: `Forbidden: ${string}`;
};

export type ServerError = DefaultError & {
	status: 500;
	message: string;
};
