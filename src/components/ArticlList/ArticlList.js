import React from 'react';
import articlList from './ArticlList.module.scss';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';

const ArticlList = (props) => {
  const { slug } = useParams();

  const [posts, setPosts] = useState([]);

  // let data = format(posts.createdAt, 'dd MMMM yyyy');

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
                    {/* <span className={articlList.articl__header_userData}>{typeof data === 'string' ? data : ''}</span> */}
                  </div>
                  <div>
                    <img className={articlList.articl__header_userImage} src={posts.author.image} alt="none" />
                  </div>
                </div>
              </header>
              <main className={articlList.articl__main}>
                <p className={articlList.articl__main_text}>{posts.body}</p>
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
