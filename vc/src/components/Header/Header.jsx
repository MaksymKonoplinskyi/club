import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { logout, selectIsAuth } from "../../redux/slices/auth";
import { Avatar } from '@mui/material';

export const Header = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  const navigate = useNavigate()
  const avatarUrl = useSelector(state => state.auth.curentUserData?.avatarUrl)


  const onClickLogout = () => {
    if (window.confirm('Вы действитльно хотите выйти?')) {
      dispatch(logout())
      window.localStorage.removeItem('token')
    }
  };

  return (
    <div className={styles.header}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link  to="/">
            <div >
              <img className={styles.logo} src={'/logo.png'} alt={'logo'}/>
            </div>
            
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Button onClick={() => navigate('/add-post')} variant="contained" color="warning" >
                 <span>Написать</span> 
                  </Button>
                <Button onClick={onClickLogout} variant="contained" color="info">
                  Выйти
                </Button>
                <Avatar
                  onClick={() => navigate('/profile')}
                  className={styles.avatar}
                  src={avatarUrl
                    ? `${process.env.REACT_APP_API_URL}${avatarUrl}`
                    : '/noavatar.png'}
                />

              </>
            ) : (
              <>
                <Button onClick={() => navigate('/login')} 
                variant="outlined">Войти</Button>
                <Button onClick={() => navigate('/register')} 
                variant="contained">Регистрация</Button>
              </>
            )}
          </div>
        </div>
      </Container >
    </div >
  );
};
