import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostsService';
import Loader from '../components/UI/Loader/Loader';

const PostIdPage = () => {

    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const [loading, error, fetchPostById] = useFetching(async(id) => {
        console.log(id);
        const response = await PostService.getPostById(id);
        setPost(response.data);
    });

    const [comLoading, comError, fetchComments] = useFetching(async(id) => {
        console.log(id);
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data);
    });

    useEffect(() => {
        fetchPostById(params.id);
        fetchComments(params.id);
    }, []);

return (
    <div>
        <h1>Вы открыли пост с id: {params.id}</h1>
        {loading 
            ? <Loader/>
            : <div>{post.title}</div>
        }
        <h1>
            Коментарии
        </h1>
        {comLoading
            ? <Loader/>
            : <div>
                {comments.map(comm =>
                    <div key={comm.id} style={{marginTop: 15}}>
                        <h5>{comm.email}</h5>
                        <div>{comm.body}</div>
                    </div>
                )}
             </div>
        }
    </div>
)
}

export default PostIdPage;