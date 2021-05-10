CREATE TABLE Users (
  id  SERIAL PRIMARY KEY,
  nickname varchar(255),
  email varchar(255),
  created DATE default CURRENT_TIMESTAMP,
  password varchar(255)
)

CREATE TABLE Chat (
  id SERIAL PRIMARY KEY,
  created DATE default CURRENT_TIMESTAMP
)

CREATE TABLE chat_member (
    id SERIAL PRIMARY KEY,
  
    user_id integer, 
    CONSTRAINT fk_user_id
       FOREIGN KEY (user_id) 
       REFERENCES users (id),
  
    chat_id integer, 
    CONSTRAINT fk_chat_id
       FOREIGN KEY (chat_id) 
       REFERENCES chat (id)
  )
      

CREATE TABLE Message (
    id SERIAL PRIMARY KEY,
    text TEXT,
    created DATE default CURRENT_TIMESTAMP,
  
    user_id integer, 
    constraint fk_user_id
       foreign key (user_id) 
       REFERENCES users (id),
  
    chat_id integer, 
    constraint fk_chat_id
       foreign key (chat_id) 
       REFERENCES chat (id),

    chat_member_id integer,
    constraint fk_chat_member_id
    FOREIGN KEY (chat_member_id)
    REFERENCES chat_member(id)
  
  )
