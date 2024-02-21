import React from 'react'
import PostItem from './PostItem'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const PostList = ({remove, posts, title}) => {

  if(posts.length === 0) {
    return (
      <h1 style={{textAlign: 'center'}} className="">Посты не найдены</h1>
    )
  }

  return (
    <div className="">
        <h1 className="title">{title}</h1>
        <TransitionGroup>
          {posts.map((post, index) =>
          <CSSTransition
            key={post.id}
            timeout={500}
            classNames="post"
          >
            <PostItem number={post.id}  id={post.id} title={post.title} body={post.body} remove={remove}/>
          </CSSTransition>
          )}
        </TransitionGroup>

    </div>

  )
}

export default PostList