CREATE OR REPLACE FUNCTION get_secao_completa(p_secao_id INT)
RETURNS TABLE (
  secao_id INT,
  secao_nome TEXT,
  modulo_id INT,
  modulo_nome TEXT,
  submodulo_id INT,
  submodulo_nome TEXT,
  aula_id INT,
  nome TEXT
)
AS $$
BEGIN
  RETURN QUERY
  SELECT
    s.id_secao,
    s.nome_secao,
    m.id_modulo,
    m.nome_modulo,
    sm.id_submodulo,
    sm.nome_submodulo,
    a.id_aula,
    a.nome
  FROM secoes s
  LEFT JOIN modulos m ON m.id_secao = s.id_secao
  LEFT JOIN submodulos sm ON sm.id_modulo = m.id_modulo
  LEFT JOIN aula a ON a.id_submodulo = sm.id_submodulo
  WHERE s.id_secao = p_secao_id
  ORDER BY m.ordem ASC, sm.ordem ASC, a.ordem ASC;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_modulo_completo(p_modulo_id INT)
RETURNS TABLE (
  id_modulo INT,
  nome_modulo TEXT,
  submodulo_id INT,
  submodulo_nome TEXT,
  aula_id INT,
  aula_nome TEXT
)
AS $$
BEGIN
  RETURN QUERY
  SELECT m.id_modulo,
  m.nome_modulo,
  sm.id_submodulo,
  sm.nome_submodulo,
  a.id_aula,
  a.nome
  FROM modulos m
  LEFT JOIN submodulos sm ON sm.id_modulo = m.id_modulo
  LEFT JOIN aula a ON a.id_submodulo = sm.id_submodulo
  WHERE m.id_modulo = p_modulo_id
  ORDER BY sm.ordem ASC, a.ordem ASC;
END;
$$ LANGUAGE plpgsql;
