-- Создание таблиц для сообщений и чатов

-- Таблица чатов (беседы между пользователями)
CREATE TABLE chats (
    id SERIAL PRIMARY KEY,
    match_id INTEGER NOT NULL REFERENCES matches(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_message_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица сообщений
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    chat_id INTEGER NOT NULL REFERENCES chats(id),
    sender_id INTEGER NOT NULL REFERENCES users(id),
    message_text TEXT NOT NULL,
    message_type VARCHAR(20) DEFAULT 'text',
    image_url VARCHAR(500),
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    edited_at TIMESTAMP
);

-- Таблица для отслеживания статуса прочтения сообщений
CREATE TABLE message_read_status (
    id SERIAL PRIMARY KEY,
    message_id INTEGER NOT NULL REFERENCES messages(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(message_id, user_id)
);

-- Индексы для оптимизации
CREATE INDEX idx_chats_match ON chats(match_id);
CREATE INDEX idx_chats_updated ON chats(updated_at);
CREATE INDEX idx_messages_chat ON messages(chat_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_created ON messages(created_at);
CREATE INDEX idx_messages_read ON messages(is_read);
CREATE INDEX idx_message_read_status_message ON message_read_status(message_id);
CREATE INDEX idx_message_read_status_user ON message_read_status(user_id);