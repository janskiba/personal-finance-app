export const DATABASE_CONFIG = 'DATABASE_CONFIG';

export interface DatabaseConfig {
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
  url: string;
}

export function getDatabaseConfig(): DatabaseConfig {
  const host = process.env.DATABASE_HOST ?? 'localhost';
  const port = Number(process.env.DATABASE_PORT ?? 5432);
  const name = process.env.DATABASE_NAME ?? 'personal_finance';
  const user = process.env.DATABASE_USER ?? 'personal_finance_user';
  const password = process.env.DATABASE_PASSWORD ?? 'personal_finance_password';
  const url =
    process.env.DATABASE_URL ??
    `postgresql://${user}:${password}@${host}:${port}/${name}`;

  return {
    host,
    port,
    name,
    user,
    password,
    url,
  };
}