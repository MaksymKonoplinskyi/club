import React from "react";
import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { editComentIndex, fetchAllComments, fetchCreateComment, fetchPatchComment } from "../../../redux/slices/post";
import { useParams } from "react-router-dom";

export const AddComment = ({ editingComent, isCreationComment, index }) => {
  const curentUserData = useSelector(state => state.auth.curentUserData)
  const dispatch = useDispatch()
  const [text, setText] = React.useState(editingComent?.text);
  const { id } = useParams();
  const params = {
    text,
    postId: id
  } 
  const pathCommentData = {
    text,
    commentId: editingComent?._id
  }
  const onClickSend = async () => {
    await dispatch(fetchCreateComment(params))
    dispatch(fetchAllComments(id))
  }
  const onClickSave = async () => {
    await dispatch(fetchPatchComment(pathCommentData))
    dispatch(fetchAllComments(id))
  }

  const onClickCancel = () =>{
    dispatch(editComentIndex(null))
  }

  return (
    <>
      <div className={styles.root}>
        {curentUserData?.avatarUrl && <Avatar
          classes={{ root: styles.avatar }}
          src={`${process.env.REACT_APP_API_URL}${curentUserData.avatarUrl}`}
        />}
        <form className={styles.form}>
          <TextField
            label={curentUserData ? 'Написать комментарий' : 'Войдите, чтобы оставить комментарий'}
            variant='outlined'
            maxRows={10}
            type='comentText'
            multiline
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {isCreationComment ? (
            <Button onClick={onClickSend} disabled={!curentUserData} variant="contained">Отправить</Button>
          ) : (<>
            <Button onClick={onClickSave} variant="contained">Сохранить</Button>
            <Button onClick={onClickCancel} variant="contained">Отменить</Button>
          </>)


          }
        </form >
      </div>
    </>
  );
};
