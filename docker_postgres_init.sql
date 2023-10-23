CREATE USER hierarchydb WITH PASSWORD 'hierarchydb' CREATEDB;
CREATE DATABASE hierarchydb
    WITH
    OWNER = hierarchydb
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;