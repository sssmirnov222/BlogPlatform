import React from 'react';
import articlItem from './ArticlItem.module.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from '@mui/material';
import Articl from '../Articles/Articl';
import { fetchgetPosts } from '../../services/services';
// import ArticlList from '../ArticlList/ArticlList';

const ArticlItem = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);

  useEffect(() => {
    fetchgetPosts(page).then((res) => {
      // console.log(res);
      setPosts(res.articles);
      setPageQty(res.articles.length);
    });
  }, [page]);

  return (
    <>
      <div>
        <div className={articlItem.attik}>
          {/* {console.log(posts)} */}
          {posts.map((articl) => {
            let tagList = articl.tagList.map((e) => e);

            return (
              <div className={articlItem.articlList}  key={articl.title}>
                <Link to={`/articles/${articl.slug}`} className={articlItem.link}>
                  <Articl
                    body={articl.body}
                    title={articl.title}
                    name={articl.author.username}
                    image={articl.author.image}
                    tagList={tagList}
                    createdAt={articl.createdAt}
       
                  />
                </Link>
              </div>
            );
          })}
        </div>

        <div className={articlItem.pagination}>
          {<Pagination count={pageQty} page={page} onChange={(_, num) => setPage(num)}></Pagination>}
        </div>
      </div>
    </>
  );
};

export default ArticlItem;
