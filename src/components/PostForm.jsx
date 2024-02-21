import React from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

import { useState } from 'react';

const PostForm = ({create}) => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
  
    const addPost = (e) => {
        e.preventDefault();
        const newPost = {
          id: Date.now(),
          title,
          body
        };
        create(newPost);
        setTitle('');
        setBody('');
      };

  return (
    <form action="">
        <MyInput
          type="text"
          placeholder="Название поста"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        
        <MyInput
          type="text"
          placeholder="Описание поста"
          value={body}
          onChange={e => setBody(e.target.value)}
        />

        <MyButton onClick={addPost}>Создать пост</MyButton>
    </form>
  )
}

export default PostForm