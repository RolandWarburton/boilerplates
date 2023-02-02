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
