-- Создание таблиц для лайков и мэтчей

-- Таблица лайков/дизлайков
CREATE TABLE user_swipes (
    id SERIAL PRIMARY KEY,
    swiper_id INTEGER NOT NULL REFERENCES users(id),
    swiped_id INTEGER NOT NULL REFERENCES users(id),
    is_like BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(swiper_id, swiped_id)
);

-- Таблица мэтчей (когда оба пользователя лайкнули друг друга)
CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    user1_id INTEGER NOT NULL REFERENCES users(id),
    user2_id INTEGER NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    blocked_by INTEGER REFERENCES users(id),
    blocked_at TIMESTAMP,
    UNIQUE(user1_id, user2_id),
    CHECK(user1_id < user2_id)
);

-- Индексы для оптимизации
CREATE INDEX idx_user_swipes_swiper ON user_swipes(swiper_id);
CREATE INDEX idx_user_swipes_swiped ON user_swipes(swiped_id);
CREATE INDEX idx_user_swipes_like ON user_swipes(is_like);
CREATE INDEX idx_matches_user1 ON matches(user1_id);
CREATE INDEX idx_matches_user2 ON matches(user2_id);
CREATE INDEX idx_matches_active ON matches(is_active);
CREATE INDEX idx_matches_created ON matches(created_at);