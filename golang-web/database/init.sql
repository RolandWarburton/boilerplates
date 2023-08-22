CREATE USER example WITH PASSWORD 'rhinos';
GRANT ALL PRIVILEGES ON DATABASE example TO example;

CREATE TABLE accounts (
  ID uuid DEFAULT gen_random_uuid(),
  username VARCHAR (50) NOT NULL UNIQUE,
  password VARCHAR (128) NOT NULL,
  is_staff BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  PRIMARY KEY(ID)
);

ALTER TABLE accounts OWNER TO example;

-- SEED DATABASE

-- password is rhinos
INSERT INTO accounts (username, password, is_staff)
VALUES ('roland', '3de2d77d30ef46859f5a088a6c888105e66e97473a09467d02a996f879efa118', TRUE);

-- password is duck
INSERT INTO accounts (username, password, is_staff)
VALUES ('rinne', '5189148bef66f4743a8214f0c990adb2fd7661a1990c74c82bece4f8421b1631', TRUE);

