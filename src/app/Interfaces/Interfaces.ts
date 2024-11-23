export type UserRole = "Cliente"| "Dependiente" | "Cajero" | "Gerente_de_Sucursal" | "Gerente_General"; //Define los roles disponibles
export type AccountType = "Chequera" | "Ahorro"; //Define los tipos de cuenta disponibles

export interface User {
	id: string;
	username: string;
	password: string;
	role: UserRole;
	status: string;
	createdBy: string;
}

export interface Client {
	id: string;
	name: string;
	lastname: string;
	birthday: Date;
	dui: string;
	address: string;
	email: string;
	phone: string;
	work_place: string;
	work_start: string;
	occupation: string;
	work_email: string;
	work_phone: string;
	salary: number;
	credit_limit: number;
	role: UserRole;
}

export interface Account {
	id: string;
	type: AccountType;
	balance: number;
	currency: string;
	client: Client|null;
}