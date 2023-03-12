import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';


import styles from './Profile.module.scss';
import { fetchPatchProfile } from "../../redux/slices/auth";

import axios from '../../axios'
import { useNavigate } from 'react-router-dom';

export const Profile = (values) => {
  const currentAvatarUrl = useSelector(state => state.auth.curentUserData?.avatarUrl)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setAvatarUrl(currentAvatarUrl)
  }
    , [currentAvatarUrl])


  const [avatarUrl, setAvatarUrl] = React.useState('');
  const inputFileRef = React.useRef(null);
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append('image', file)
      const { data } = await axios.post('/uploadAvatar', formData)
      setAvatarUrl(data.url)
    } catch (err) {
      console.warm(err)
      alert('Ошибка при загрузке файла')
    }
  }
  const onClickRemoveImage = () => {
    setAvatarUrl('')
  };




  const onCancel = () => {
    navigate(`/`)
  }

  const onSave = async () => {
    const params = { avatarUrl }
    await dispatch(fetchPatchProfile(params))

    // if (!data.payload) {
    //   return alert('Не удалось изменить фото')
    // }
  }

  // if (isAuth) {
  //   return <Navigate to='/' />
  // }

  return (
    <Paper classes={{ root: styles.root }}>
      <form >
        <Typography classes={{ root: styles.title }} variant="h5">
          Профиль пользователя
        </Typography>


        <Button className={styles.button} onClick={() => inputFileRef.current.click()}
          variant="outlined" size="large" fullWidth>
          {avatarUrl ? 'Выбрать другое фото' : 'Загрузить аватар'}
        </Button >
        <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
        {avatarUrl && (
          <>
            <Button className={styles.button} size="large" variant="outlined" onClick={onClickRemoveImage} fullWidth>
              Удалить аватар
            </Button>
            <Avatar className={styles.avatar} sx={{ width: 150, height: 150 }} alt={'Uploaded'}
              src={`${process.env.REACT_APP_API_URL}${avatarUrl}`} />

          </>
        )}
        {(currentAvatarUrl !== avatarUrl)
          && <div className={styles.buttons}><Button className={styles.button}
            onClick={onSave} size="large" color='success'
            variant="contained" fullWidth>
            Сохранить
          </Button>
            <Button onClick={onCancel} color='error' size="large" variant="contained" fullWidth>Отмена</Button>
          </div>}
      </form>
    </Paper>
  );
};
