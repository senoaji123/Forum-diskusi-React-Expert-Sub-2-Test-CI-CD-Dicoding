import { useDispatch, useSelector } from 'react-redux';
import FormatDate from '../utils/FormatDate';
import { Link } from 'react-router-dom';
import {
  asyncGetThreadAndUsers,
} from '../states/ThreadandUsers/action';
import { useEffect } from 'react';
import { MdAddBox } from 'react-icons/md';

function HomePage() {
  const { users, threads } = useSelector((state) => state.ThreadAndUser);
  const { isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetThreadAndUsers());
  }, [dispatch]);

  return (
    <section className="homepage">
      <div className="forum-list">
        <img src="" alt="" />
        <div className="forum-list__title">
          <h1>Daftar Forum Diskusi</h1>
        </div>
        {threads.length > 0 && threads.map((thread) => (
          <section key={thread.id} style={{ marginBlock: '30px', marginInline: '10px' }}>
            <div className="forum-item">
              <div className="forum-item__detail">
                <div className="container__detail">
                  <div className="forum-item__info">
                    <Link className="forum-item__title" to={`/threads/${thread.id}`}>{thread.title}</Link>
                  </div>
                  <p className="forum-item__created-at">{FormatDate(thread.createdAt)}</p>
                </div>
                <div className="container__detail__title">
                  <p className="forum-item__text">{thread.body}</p>
                </div>
                <div className="container__detail__user">
                  <p>{users.find((item) => item.id === thread.ownerId).name}</p>
                </div>
                <p style={{ textAlign: 'end', fontWeight: 'bold', fontSize: '1rem' }}>{thread.totalComments === 0 ? 'Tidak ada Komentar' : `Jumlah Komentar: ${thread.totalComments}`}</p>
              </div>
            </div>
            <div>
              {isLogin && (
              <div style={{
                position: 'fixed', right: '2rem', bottom: '2rem', fontSize: '1.25rem',
              }}
              >
                <Link to="/add-discussion"><MdAddBox style={{ color: 'black', fontSize: '3rem' }} /></Link>
              </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

export default HomePage;
