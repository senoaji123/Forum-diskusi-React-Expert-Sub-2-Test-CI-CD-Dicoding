import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { asyncGetThreadDetail, asyncAddComment } from '../states/ThreadDetail/action';
import formatDate from '../utils/FormatDate';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import DetailComment from '../components/DetailComment';

export default function DetailForum() {
  const [content, HandleContent] = useInput('');
  const { id } = useParams();
  const { threadDetail, commentCreated } = useSelector((state) => state.ThreadsDetail);
  const dispatch = useDispatch();
  const [render, setRender] = useState(false);

  function HandleSubmit(e) {
    e.preventDefault();
    dispatch(asyncAddComment({ threadId: id, content }));
  }

  useEffect(() => {
    if (!render) {
      dispatch(asyncGetThreadDetail(id));
      setRender(true);
    }
    if (commentCreated) {
      dispatch(asyncGetThreadDetail(id));
    }
  }, [commentCreated, id, dispatch, render]);

  return (
    <section className="container-detail-parent">
      <p>{threadDetail.category}</p>
      <p>{threadDetail.title}</p>
      <p>{threadDetail.body}</p>
      <div className="detail-forum__avatar">
        <img src={threadDetail.owner?.avatar} alt="foto" />
        <p style={{ fontSize: '20px', fontWeight: 'bold', textDecoration: 'underline' }}>
          Dibuat oleh:
          {threadDetail.owner?.name}
        </p>
      </div>
      <p>{formatDate(threadDetail.createdAt)}</p>
      <div className="detail-forum__textarea">
        <form onSubmit={HandleSubmit}>
          <textarea name="" id="" cols="30" rows="10" onChange={HandleContent} value={content} />
          <button type="submit">Komentar</button>
        </form>
      </div>
      <div className="detail-forum__comment">
        <p>{threadDetail.comments?.length === 0 ? 'Tidak ada komentar' : `Jumlah komentar : ${threadDetail.comments?.length}`}</p>
        {threadDetail.comments?.map((item) => (
          <DetailComment
            key={item.id}
            avatar={item.owner?.avatar}
            name={item.owner?.name}
            content={item.content}
            createdAt={item.createdAt}
          />
        ))}
      </div>
    </section>
  );
}
