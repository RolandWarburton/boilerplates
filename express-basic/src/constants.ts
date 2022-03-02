const PORT: number = parseInt(process.env["PORT"] as string) || 3000;
const NODE_ENV: string = process.env["NODE_ENV"] || "development";
const LOG_LEVEL: string = process.env["LOG_LEVEL"] || "debug";
const DOMAIN = process.env["DOMAIN"] || "localhost";

export { PORT, NODE_ENV, LOG_LEVEL, DOMAIN };
