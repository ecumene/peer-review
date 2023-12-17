CREATE TABLE meets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    creator_id TEXT NOT NULL,
    due_date DATE NOT NULL
);

CREATE TABLE meet_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    meet_id INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY (meet_id) REFERENCES meets(id)
);

CREATE TABLE memos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    due_date DATE NOT NULL,
    author_id TEXT NOT NULL,
    assigned_by TEXT NOT NULL
);

CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    memo_id INTEGER NOT NULL,
    author_id TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (memo_id) REFERENCES memos(id)
);
