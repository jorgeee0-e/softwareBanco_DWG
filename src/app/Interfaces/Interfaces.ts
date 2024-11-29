export type UserRole = "Cliente"| "Dependiente" | "Cajero" | "Gerente_de_Sucursal" | "Gerente_General"; //Define los roles disponibles
export type AccountType = "Chequera" | "Ahorro"; //Define los tipos de cuenta disponibles
export type MovementType = "deposit" | "withdrawal" | "transfer_in" | "transfer_out"; //Define los tipos de cuenta disponibles

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
	user_id: User | null;
}

export interface Account {
	id: string;
	type: AccountType;
	balance: number;
	currency: string;
	client: Client|null;
}



export interface Transaction {
	id: string;
	description: string;
	type: MovementType;
	amount: number;
	date: Date;
	account_transmitter: Account;
	account_receiver: Account;
}
export interface Auth{
	username: string;
	password: string;
}

export interface LoginResponse {
	token: string;
	role: string;
  }