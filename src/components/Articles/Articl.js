import React, { useState } from 'react';
import articl from './Articl.module.scss';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { disLikeArticl, likeArticl } from '../../redux/actions/actiosPosts';
import { useDispatch, useSelector } from 'react-redux';

const Articl = (props) => {
  let data = format(props.createdAt, 'dd MMMM yyyy');
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);

  const token = useSelector((state) => {
    const { users } = state.rootReducer;
    return users.token;
  });

  const slugPost = useSelector((state) => {
    const { posts } = state.rootReducer;
    return posts.slug;
  });

  const favorited = useSelector((state) => {
    const { posts } = state.rootReducer;
    return posts.favorited;
  });

  const title = useSelector((state) => {
    const { posts } = state.rootReducer;
    return posts.title;
  });

  const body = useSelector((state) => {
    const { posts } = state.rootReducer;
    return posts.body;
  });

  const description = useSelector((state) => {
    const { posts } = state.rootReducer;
    return posts.description;
  });

  const toggleLike = () => {
    setLiked(!liked);
    if (liked === false) {
      dispatch(likeArticl(props.slug, token));
    } else {
      dispatch(disLikeArticl(props.slug, token));
    }
  };

  return (
    <>
      <div className={articl.articl}>
        <header className={articl.articl__header}>
          <div className={articl.articl__header_info}>
            <div className={articl.articl__header_infoTitle}>
              <Link to={`/articles/${props.slug}`} className={articl.linkTitle}>
                <span>{props.title !== title && props.slug === slugPost ? title : props.title}</span>
              </Link>

              <button onClick={toggleLike} className={articl.favorite}>
                {' '}
                {(props.slug === slugPost ? favorited : false) ? '❤️' : '🤍'}
              </button>
            </div>
            <div>
              <Link to={`/articles/${props.slug}`} className={articl.link}>
                {props.tagList.map((e) => {
                  if (e === '') return '';
                  return (
                    <span className={articl.articl__header_infoTags} key={props.title + Math.random()}>
                      {e}
                    </span>
                  );
                })}
              </Link>
            </div>
          </div>
          <Link to={`/articles/${props.slug}`} className={articl.link}>
            <div className={articl.articl__header_user}>
              <div className={articl.articl__header_userInfo}>
                <span className={articl.articl__header_userName}>
                  <span>{props.name}</span>
                </span>
                <span className={articl.articl__header_userData}>{data}</span>
              </div>
              <div>
                <img
                  className={articl.articl__header_userImage}
                  src={
                    props.image === undefined || null || props.image.slice(0, 4) !== 'http'
                      ? 'https://static.productionready.io/images/smiley-cyrus.jpg'
                      : props.image
                  }
                  alt="none"
                />
              </div>
            </div>
          </Link>
        </header>
        <Link to={`/articles/${props.slug}`} className={articl.link}>
          {' '}
          <main className={articl.articl__main}>
            <p className={articl.articl__main_text}>{props.body}</p>
          </main>
        </Link>
      </div>
    </>
  );
};

export default Articl;
