import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';

import styles from './Login.module.scss';
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from 'react-router-dom';

// import axios from '../../axios'

export const Registration = (values) => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  })

              // Загрузка авы

  // const [avatarUrl, setAvatarUrl] = React.useState('');
  // const inputFileRef = React.useRef(null);
  // const handleChangeFile = async (event) => {
  //   try {
  //     const formData = new FormData()
  //     const file = event.target.files[0]
  //     formData.append('image', file)
  //     const { data } = await axios.post('/uploadAvatar', formData)
  //     setAvatarUrl(data.url)
  //   } catch (err) {
  //     console.warm(err)
  //     alert('Ошибка при загрузке файла')
  //   }
  // }
  // const onClickRemoveImage = () => {
  //   setAvatarUrl('')
  // };

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))

    if (!data.payload) {
      return alert('Не удалось зарегистрироваться')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if (isAuth) {
    return <Navigate to='/' />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Создание аккаунта
        </Typography>

        {/* загрузка авы */}

        {/* <Button className={styles.button} onClick={() => inputFileRef.current.click()}
          variant="outlined" size="large" fullWidth>
          {avatarUrl ? 'Изменить аватар' : 'Загрузить аватар'}
        </Button >
        <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
        {avatarUrl && (
          <>
            <Button className={styles.button} size="large" variant="outlined" onClick={onClickRemoveImage} fullWidth>
              Удалить
            </Button>
            <Avatar className={styles.avatar} sx={{ width: 150, height: 150 }} alt={'Uploaded'}
              src={`${process.env.REACT_APP_API_URL}${avatarUrl}`} />
          </>
        )} */}


        <TextField error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          type='fullName'
          {...register('fullName', { required: 'Укажите полное имя' })}
          className={styles.field} label="Полное имя" fullWidth />
        <TextField error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type='email'
          {...register('email', { required: 'Укажите почту' })}
          className={styles.field} label="E-Mail" fullWidth />
        <TextField error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type='password'
          {...register('password', { required: 'Укажите пароль' })}
          className={styles.field} label="Пароль" fullWidth />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
