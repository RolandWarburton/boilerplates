interface IAccount {
  id: string;
  username: string;
  password: string;
  is_staff: boolean;
  created_at: string;
  updated_at: string;
}

export type { IAccount };
