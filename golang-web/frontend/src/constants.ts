const PROTOCOL: string = (process.env.PROTOCOL as string) || 'https';
const DOMAIN: string = (process.env.DOMAIN as string) || 'localhost';
const PORT: number = parseInt(process.env.PORT as string) || 443;
const API_PORT: number = parseInt(process.env.API_PORT as string) || 443;
const API_ROOT: string = process.env.API_PORT as string || 'api/v1';

export { PROTOCOL, DOMAIN, PORT, API_PORT, API_ROOT };
