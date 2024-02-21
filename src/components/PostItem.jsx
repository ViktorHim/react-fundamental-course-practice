import React from 'react'
import MyButton from './UI/button/MyButton'
import { useNavigate } from 'react-router-dom'

const PostItem = ({id, title, body, remove, number}) => {
    const navigate = useNavigate();

  return (
        <div className="post">
            <div className="post__content">
                <strong>{number}. {title}</strong>
                <div>
                    {body}
                </div>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => navigate(`/posts/${id}`)}>Открыть</MyButton>
                <MyButton onClick={() => remove(id)}>Удалить</MyButton>
            </div>
        </div>
  )
}

export default PostItem;