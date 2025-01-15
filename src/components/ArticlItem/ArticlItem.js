import React from 'react';
import articlItem from './ArticlItem.module.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from '@mui/material';
import Articl from '../Articles/Articl';
import { fetchgetPosts } from '../../services/services';
import { Spin } from 'antd';
// import ArticlList from '../ArticlList/ArticlList';

const ArticlItem = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchgetPosts(page).then((res) => {
      console.log(res);
      setPosts(res.articles);
      setPageQty(res.articlesCount);
      setLoading(false);
    });
  }, [page]);

  return (
    <>
      <div>
        <div className={articlItem.attik}>
          {/* {console.log(posts)} */}
          {loading ? (
            <Spin className={articlItem.loader} />
          ) : (
            posts.map((articl, id) => {
              let tagList = articl.tagList.map((e) => e);

              return (
                <div className={articlItem.articlList} key={articl.title}>
                  <Articl
                    key={id}
                    slug={articl.slug}
                    body={articl.body}
                    title={articl.title}
                    name={articl.author.username}
                    image={articl.author.image}
                    tagList={tagList}
                    createdAt={articl.createdAt}
                  />
                </div>
              );
            })
          )}
        </div>

        <div className={articlItem.pagination}>
          {
            <Pagination
              count={pageQty}
              page={page}
              onChange={(_, num) => {
                setPage(num);
                console.log(page);
              }}
            ></Pagination>
          }
        </div>
      </div>
    </>
  );
};

export default ArticlItem;
