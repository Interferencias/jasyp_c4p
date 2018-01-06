-- Up
CREATE TABLE IF NOT EXISTS papers(
	id				INTEGER PRIMARY KEY,
	title			TEXT NOT NULL,
	name			TEXT NOT NULL,
	email			TEXT NOT NULL,
	abstract	TEXT NOT NULL,
	message  	TEXT NOT NULL
);

-- Down
