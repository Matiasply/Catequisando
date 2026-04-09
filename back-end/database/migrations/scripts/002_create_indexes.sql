CREATE INDEX idx_usuario_email ON usuario(email);


CREATE INDEX idx_refresh_token_hash ON refresh_tokens(token_hash);
CREATE INDEX idx_usuario_id ON refresh_tokens(usuario_id);