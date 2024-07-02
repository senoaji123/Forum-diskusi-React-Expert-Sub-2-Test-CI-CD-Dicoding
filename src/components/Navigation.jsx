import api from '../utils/api';
import { Link } from 'react-router-dom';
import { asyncGetProfileAction, logoutActionCreator } from '../states/authUser/action';
import { useEffect } from 'react';
import { LuLogOut } from 'react-icons/lu';
import { GrLogin } from 'react-icons/gr';
import { LiaForumbee } from 'react-icons/lia';
import { MdOutlineLeaderboard } from 'react-icons/md';

import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';

export default function Navigation() {
  const { profile, isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function EventHandleLogout() {
    api.removeAccessToken();
    dispatch(logoutActionCreator());
  }

  useEffect(() => {
    if (isLogin) {
      dispatch(asyncGetProfileAction());
    }
  }, [dispatch, isLogin]);

  return (
    <>
      <LoadingBar />
      <nav className="list-navigation">
        <div className="navigation__title">
          <h1>Forum Diskusi</h1>
        </div>
        <ul className="navigation__item">
          <li>
            <Link to="/" style={{ color: 'white' }}><LiaForumbee style={{ fontSize: '2rem' }} /></Link>
          </li>
          <li>
            <Link to="/leaderboards" style={{ color: 'white' }}><MdOutlineLeaderboard style={{ fontSize: '2rem' }} /></Link>
          </li>
          {isLogin ? (
            <li>
              <div className="navigation__avatar">
                <p
                  type="button"
                  style={{ color: 'white', display: 'flex', alignItems: 'center' }}
                  aria-label="logout"
                  onClick={EventHandleLogout}
                >
                  <LuLogOut style={{ fontSize: '2rem' }} />
                </p>
                <div className="navigation__avatar__item">
                  <img src={profile?.avatar} alt="" width="50px" />
                  <div className="navigation__avatar__name">
                    <p>{profile?.name}</p>
                    <p>{profile?.email}</p>
                  </div>
                </div>
              </div>
            </li>
          ) : (
            <li id="login">
              <Link style={{ color: 'white' }} to="/login"><GrLogin style={{ fontSize: '2rem' }} /></Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
