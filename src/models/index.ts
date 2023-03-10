export type Permission = 'image' | 'user-management' | 'DEBUG';

export type User = {
	id: number;
	username: string;
	passwordHash: string;
	dateAdded: number;
	dateRemoved: number | null;
	permissions: Permission[];
};
