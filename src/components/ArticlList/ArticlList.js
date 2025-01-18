import React from 'react';
import articlList from './ArticlList.module.scss';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { NavLink, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { message, Popconfirm } from 'antd';
import { deletePost } from '../../services/services';
import { disLikeArticl, likeArticl } from '../../redux/actions/actiosPosts';
import { containerClasses } from '@mui/material';

const ArticlList = (props) => {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const token = useSelector((state) => {
    const { users } = state.rootReducer;
    return users.token;
  });
  const username = useSelector((state) => {
    const { users } = state.rootReducer;
    return users.username;
  });

  const favorited = useSelector((state) => {
    const { posts } = state.rootReducer;
    return posts.favorited;
  });

  console.log('liked', liked);

  const slugPost = useSelector((state) => {
    const { posts } = state.rootReducer;
    return posts.slug;
  });

  const toggleLike = () => {
    setLiked(!liked);
    if (!liked) {
      dispatch(likeArticl(slugPost, token));
    } else {
      dispatch(disLikeArticl(slugPost, token));
    }
  };
  let data = null;

  try {
    data = format(posts.createdAt, 'dd MMMM yyyy');
  } catch (e) {
    console.log('Error time', e);
  }

  useEffect(() => {
    fetch(`https://blog-platform.kata.academy/api/articles/${slug}`)
      .then((data) => data.json())
      .then((data) => {
        // console.log('data', data);
        setPosts(data.article);
      });
  }, [slug]);

  try {
    return (
      <div>
        {posts && (
          <>
            <div className={articlList.articl}>
              <header className={articlList.articl__header}>
                <div className={articlList.articl__header_info}>
                  <div className={articlList.articl__header_infoTitle}>
                    <span>{posts.title}</span>
                    <button className={articlList.favorite} onClick={toggleLike}>
                      {' '}
                      {(slug === slugPost ? favorited : false) ? '❤️' : '🤍'}
                    </button>
                  </div>
                  <div>
                    {posts.tagList.map((e) => {
                      if (e === '') return '';
                      return <span className={articlList.articl__header_infoTags}>{e}</span>;
                    })}
                  </div>
                </div>
                <div className={articlList.articl__header_user}>
                  <div className={articlList.articl__header_userInfo}>
                    <span className={articlList.articl__header_userName}>
                      <span>{posts.author.username}</span>
                    </span>
                    <span className={articlList.articl__header_userData}>{typeof data === 'string' ? data : ''}</span>
                  </div>
                  <div>
                    <img
                      className={articlList.articl__header_userImage}
                      src={
                        posts.author.image === undefined || null || posts.author.image.slice(0, 4) !== 'http'
                          ? 'https://static.productionready.io/images/smiley-cyrus.jpg'
                          : posts.author.image
                      }
                      alt="none"
                    />
                  </div>
                </div>
              </header>
              <main className={articlList.articl__main}>
                <p className={articlList.articl__main_text}>{posts.body}</p>

                {posts.author.username === username && (
                  <div>
                    <Popconfirm
                      placement={'right'}
                      description="Are you sure to delete this article?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => {
                        deletePost(slug, token);

                        message.success('Пост успешно удалён, обновите страницу');
                        navigate('/');
                      }}
                      onCancel={() => message.error('Click on No')}
                    >
                      <NavLink to={`/articles/${slug}`} className={articlList.delete}>
                        Delete
                      </NavLink>
                    </Popconfirm>
                    <NavLink to={`/articles/${slug}/edit`} className={articlList.edit} end>
                      Edit
                    </NavLink>
                  </div>
                )}
              </main>
              <div className={articlList.description}>
                <p>Est Ampyciden pater patent</p>
                <p>Amor saxa inpiger</p>
                <p>
                  Lorem markdownum Stygias neque is referam fudi, breve per. Et Achaica tamen: nescia ista occupat,
                  illum se ad potest humum et
                </p>
                <p>Qua deos has fontibus</p>
                <p>
                  Recens nec ferro responsaque dedere armenti opes momorderat pisce, vitataque et fugisse. Et iamque
                  incipiens, qua huius suo omnes ne pendentia citus pedum.
                </p>
                <p> Quamvis pronuba</p>
                <p>
                  Ulli labore facta. Io cervis non nosterque nullae, vides: aethere Delphice subit, tamen Romane ob
                  cubilia Rhodopen calentes librata! Nihil populorum flava, inrita? Sit hic nunc, hoc formae Esse illo?
                  Umeris eram similis, crudelem de est relicto ingemuit finiat Pelia uno cernunt Venus draconem, hic,
                  Methymnaeae. 1. Clamoribus haesit tenentem iube Haec munera 2. Vincla venae 3. Paris includere etiam
                  tamen 4. Superi te putria imagine Deianira 5. Tremore hoste Esse sed perstat capillis siqua
                </p>
                <ol>
                  <li>Clamoribus haesit tenentem iube Haec munera</li>
                  <li>Vincla venae</li>
                  <li>Paris includere etiam tamen</li>
                  <li>Superi te putria imagine Deianira</li>
                  <li>Tremore hoste Esse sed perstat capillis siqua</li>
                </ol>
              </div>
            </div>
          </>
        )}
      </div>
    );
  } catch (e) {
    console.log('Errooor', e);
  }
};

export { ArticlList };
