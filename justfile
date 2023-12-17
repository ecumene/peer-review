db_clear:
  rm -fr db/sqlite.db

db_init:
  sqlite3 db/sqlite.db < db/init.sql