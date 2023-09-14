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
VALUES ('roland', 'aa342a6b087d9fe25e96457873ca611b35158223281c1985a11cf9ad26f89ec0', TRUE);

-- password is duck
INSERT INTO accounts (username, password, is_staff)
VALUES ('rinne', '2d2370db2447ff8cf4f3accd68c85aa119a9c893effd200a9b69176e9fc5eb98', TRUE);

