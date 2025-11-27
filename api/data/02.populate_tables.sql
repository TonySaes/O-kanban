BEGIN;

INSERT INTO "list"
  ("id", "title", "position")
VALUES
  (1, 'Liste des courses', 1),
  (2, 'Todo', 2),
  (3, 'Liste des anniversaires', 3)
;


INSERT INTO "card" 
  (id, position, content, color, list_id)
VALUES
  (1, 3, 'Savon', '#FF00FF', 1),
  (2, 2, 'Pain', NULL, 1),
  (3, 1, 'Pomme', '#00FF00', 1),

  (4, 1, 'Sortir le chien', '#FF0000', 2),
  (5, 2, 'Faire la vaisselle', NULL, 2),
  (6, 2, 'Faire la lessive', NULL, 2),

  (7, 1, 'Maman : 17/07', '#0000FF', 3)
  (8, 2, 'Jerome : 24/05', NULL, 3)
;

INSERT INTO "tag" 
  (id, name, color)
VALUES 
  (1, 'Urgent', '#FF00FF'),
  (2, 'Important', '#000000'),
  (3, 'Perso', '#00FF00')
;

INSERT INTO "card_has_tag" 
  (card_id, tag_id) 
VALUES 
  (1, 3), -- Savon : eco-friendly
  (1, 1), -- Savon : urgent
  (5, 1), -- Faire la vaisselle : urgent
  (4, 2)  -- Sortir le chien : important
;

INSERT INTO "user" 
  (id, username, password, role) 
VALUES 
  (1, 'Alice', '$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM', 'admin'),
  (2, 'Bob', '$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM', 'member')
;

SELECT setval('list_id_seq', (SELECT MAX(id) from "list")); 
SELECT setval('card_id_seq', (SELECT MAX(id) from "card"));
SELECT setval('tag_id_seq', (SELECT MAX(id) from "tag"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));


COMMIT;