import { useEffect, useRef, useState } from "react";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostsService";
import Loader from "../components/UI/Loader/Loader";
import { getPageCount } from "../utils/pages";
import Pagination from "../components/UI/pagination/pagination";
import { isElementOfType } from "react-dom/test-utils";
import { useObserver } from "../hooks/useObserver";


function Posts() {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '' , query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const lastElement = useRef();

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [loading, error, fetching] = useFetching(async () => {
    const response = await PostService.getAllPosts(limit, currentPage);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useObserver(lastElement, currentPage < totalPages, loading, () => {
    setCurrentPage(currentPage + 1);
  });

  useEffect(() => {
    fetching();
  }, [currentPage]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

//Получаем id из дочернего компонента
    const removePost = (id) => {
        setPosts(posts.filter(p => p.id !== id));
    }

return (
    <div className="App">
        <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>Создать пост</MyButton>
        <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost}/>
        </MyModal>
        <hr className="line"/>
        <PostFilter filter={filter} setFilter={setFilter}/>
        {error &&
          <h1 style={{textAlign: "center"}}>Произошла ошибка ${error}</h1>
        }
        <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Список постов"}/>
        <div style={{height:20, backgroundColor: 'red'}} ref={lastElement}></div>
        {loading && <div style={{display: "flex", justifyContent: "center"}}><Loader/></div>}
        
        <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  );
}

export default Posts;