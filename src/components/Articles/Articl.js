import React from 'react';
import articl from './Articl.module.scss';
import { format } from 'date-fns';

const Articl = (props) => {
  let data = format(props.createdAt, 'dd MMMM yyyy');
  // console.log(props.tagList);
  // console.log(props.tagList.length);
  return (
    <>
      <div className={articl.articl}>
        <header className={articl.articl__header}>
          <div className={articl.articl__header_info}>
            <div className={articl.articl__header_infoTitle}>
              <span>{props.title}</span>
            </div>
            <div>
              {props.tagList.map((e) => {
                if (e === '') return '';
                return <span className={articl.articl__header_infoTags}>{e}</span>;
              })}
            </div>
          </div>
          <div className={articl.articl__header_user}>
            <div className={articl.articl__header_userInfo}>
              <span className={articl.articl__header_userName}>
                <span>{props.name}</span>
              </span>
              <span className={articl.articl__header_userData}>{data}</span>
            </div>
            <div>
              <img className={articl.articl__header_userImage} src={props.image} alt="none" />
            </div>
          </div>
        </header>
        <main className={articl.articl__main}>
          <p className={articl.articl__main_text}>{props.body}</p>
        </main>
      </div>
    </>
  );
};

export default Articl;
