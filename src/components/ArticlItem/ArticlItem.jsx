import React from 'react';
import articlItem from './ArticlItem.module.scss';
import { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import Articl from '../Articles/Articl';
import { fetchgetPosts } from '../../services/services';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles } from '../../redux/actions/actiosPosts';

const ArticlItem = () => {
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(1);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchgetPosts(page).then((res) => {
      setPageQty(res.articlesCount);
      dispatch(getArticles(res.articles));
      setLoading(false);
    });
  }, [page]);

  const posts = useSelector((state) => {
    const { posts } = state.rootReducer;
    return posts.post;
  });

  return (
    <>
      <div>
        <div className={articlItem.attik}>
          {loading ? (
            <Spin className={articlItem.loader} />
          ) : (
            posts.map((articl, id) => {
              try {
                return (
                  <div className={articlItem.articlList} key={id}>
                    <Articl
                      key={id}
                      slug={articl.slug}
                      body={articl.body}
                      title={articl.title}
                      name={articl.author.username}
                      image={articl.author.image}
                      tagList={articl.tagList}
                      createdAt={articl.createdAt}
                      favorited={articl.favorited}
                    />
                  </div>
                );
              } catch (e) {
                alert('Произошла ошибка, попробуйте перезагрузить страницу');
              }
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
              }}
            ></Pagination>
          }
        </div>
      </div>
    </>
  );
};

export default ArticlItem;
