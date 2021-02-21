drop table if exists sensor_data;

CREATE TABLE sensor_data (
  id serial,
  device_id integer,
  created_at bigint,
  temperature decimal,
  humidity decimal,
  voltage decimal,
  PRIMARY KEY (id)
);