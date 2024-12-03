-- Crear la tabla roles
CREATE TABLE roles (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(64) NOT NULL
);

-- Crear la tabla users
CREATE TABLE users (
    id VARCHAR(64) PRIMARY KEY,
    fullname VARCHAR(256) NOT NULL,
    email VARCHAR(256) NOT NULL UNIQUE,
    role_id VARCHAR(64),
    pass_hash VARCHAR(1024),
    CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE SET NULL
);

-- Crear la tabla subject
CREATE TABLE subject (
    id VARCHAR(64) PRIMARY KEY,
    code VARCHAR(64) NOT NULL,
    name VARCHAR(64) NOT NULL,
    color_hex VARCHAR(32) NOT NULL DEFAULT '0000ff',
    active BOOLEAN NOT NULL DEFAULT true
);

-- Crear la tabla subject_coordinator
CREATE TABLE subject_coordinator (
    id VARCHAR(64) PRIMARY KEY,
    coordinator_id VARCHAR(64) NOT NULL,
    subject_id VARCHAR(64) NOT NULL,
    CONSTRAINT fk_sub_cor_coordinator FOREIGN KEY (coordinator_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_sub_cor_subject FOREIGN KEY (subject_id) REFERENCES subject (id) ON DELETE CASCADE
);

-- Crear la tabla section
CREATE TABLE section (
    id VARCHAR(64) PRIMARY KEY,
    code VARCHAR(64) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    subject_id VARCHAR(64),
    CONSTRAINT fk_section_subject FOREIGN KEY (subject_id) REFERENCES subject (id) ON DELETE SET NULL
);

-- Crear la tabla period
CREATE TABLE period (
    id VARCHAR(64) PRIMARY KEY,
    year INT NOT NULL,
    period INT NOT NULL
);

-- Crear la tabla event_application
CREATE TABLE event_application (
    id VARCHAR(64) PRIMARY KEY,
    description VARCHAR(1024), 
    period_id VARCHAR(64),
    enddate TIMESTAMP NOT NULL,
    startdate TIMESTAMP NOT NULL,
    created_by VARCHAR(64),
    CONSTRAINT fk_period FOREIGN KEY (period_id) REFERENCES period (id) ON DELETE SET NULL,
    CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE SET NULL
);

-- Crear la tabla state_application
CREATE TABLE state_application (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(128) NOT NULL
);

-- Crear la tabla assistant_application
CREATE TABLE assistant_application (
    id VARCHAR(64) PRIMARY KEY,
    subject_id VARCHAR(64),
    user_id VARCHAR(64),
    period_id VARCHAR(64),
    date TIMESTAMP NOT NULL,
    event_id VARCHAR(64),
    state_id VARCHAR(64),
    last_editor_id VARCHAR(64),
    CONSTRAINT fk_subject FOREIGN KEY (subject_id) REFERENCES subject (id) ON DELETE SET NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_period FOREIGN KEY (period_id) REFERENCES period (id) ON DELETE CASCADE,
    CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES event_application (id) ON DELETE CASCADE,
    CONSTRAINT fk_state FOREIGN KEY (state_id) REFERENCES state_application (id) ON DELETE SET NULL,
    CONSTRAINT fk_last_editor FOREIGN KEY (last_editor_id) REFERENCES users (id) ON DELETE SET NULL
);


CREATE TABLE assistant (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL,
    section_id VARCHAR(64) NOT NULL,
    period_id VARCHAR(64) NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_section FOREIGN KEY (section_id) REFERENCES section (id) ON DELETE CASCADE,
    CONSTRAINT fk_period FOREIGN KEY (period_id) REFERENCES period (id) ON DELETE CASCADE
);

INSERT INTO public.state_application (id, "name")
VALUES
  ('1e4e28a0-1234-4c56-9876-1234567890ab', 'En revisión'),
  ('2a5f37b1-2345-4d67-8765-2345678901bc', 'Rechazada'),
  ('3b6g48c2-3456-4e78-7654-3456789012cd', 'Aprobada'),
  ('4c7h59d3-4567-4f89-6543-4567890123de', 'Cancelada');

INSERT INTO public.roles (id,"name") VALUES
	 ('ffc42398-d559-4deb-b380-652f2bd34ead','Administrator'),
	 ('8ab6efab-8990-4c83-9b0b-7930fda2048c','UserApp');
