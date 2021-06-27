-- Получить список всех категорий
SELECT id, name
FROM categories;

-- Получить список категорий для которых создана минимум одна публикация
SELECT id, name
FROM categories
  JOIN article_category ON id = category_id
  GROUP BY id;

-- Получить список категорий с количеством публикаций
SELECT id, name, COUNT(article_id)
FROM categories
  LEFT JOIN article_category
  ON id = category_id
  GROUP BY id;

-- Получить список публикаций. Сначала свежие публикации
SELECT
  articles.id AS id,
  title,
  announce,
  articles.created_at AS created_at,
  users.first_name,
  users.last_name,
  users.email,
  COUNT (comments.id) AS comments_count,
  STRING_AGG(DISTINCT categories.name, ', ') AS category_list
FROM articles
  JOIN article_category ON articles.id = article_category.article_id
  JOIN categories ON categories.id = article_category.category_id
  LEFT JOIN comments ON comments.article_id = articles.id
  JOIN users ON users.id = articles.user_id
  GROUP BY articles.id, users.id
  ORDER BY articles.created_at DESC;

-- Получить полную информацию определённой публикации
SELECT
  articles.id AS id,
  title,
  announce,
  full_text,
  articles.created_at AS created_at,
  picture,
  users.first_name,
  users.last_name,
  users.email,
  COUNT (comments.id) AS comments_count,
  STRING_AGG(DISTINCT categories.name, ', ') AS category_list
FROM articles
  JOIN article_category ON articles.id = article_category.article_id
  JOIN categories ON categories.id = article_category.category_id
  LEFT JOIN comments ON comments.article_id = articles.id
  JOIN users ON users.id = articles.user_id
WHERE articles.id = 1
  GROUP BY articles.id, users.id

-- Получить список из 5 свежих комментариев
SELECT
  comments.id AS id,
  article_id,
  users.first_name,
  users.last_name,
  text
FROM comments
  JOIN users ON users.id = comments.user_id
  ORDER BY comments.created_at DESC
  LIMIT 5;

-- Получить список комментариев для определённой публикации
SELECT
  comments.id AS id,
  article_id,
  users.first_name,
  users.last_name,
  text
FROM comments
  JOIN users ON users.id = comments.user_id
WHERE comments.article_id = 1
  ORDER BY comments.created_at DESC;

-- Обновить заголовок определённой публикации
UPDATE articles
SET title = 'Как я встретил Новый год'
WHERE id = 1;
