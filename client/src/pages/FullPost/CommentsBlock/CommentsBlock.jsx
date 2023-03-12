import React from "react";
// import styles from "./Comment.module.scss";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { CommentEditMenu } from "./CommentEditMenu";
import { AddComment } from "./AddComment";
import { useSelector } from "react-redux";
import styles from './CommentsBlock.module.scss'
import { ListSubheader } from "@mui/material";


export const CommentsBlock = ({ items, curentUserId }) => {
  const editCommentIndex = useSelector(
    state => state.fullPost.comments.editCommentIndex)
  return (
    <Paper title="Комментарии2">

      <List>
        <ListSubheader component="div" id="nested-list-subheader">
          Коментарии
        </ListSubheader>
        {items.map((obj, index) => (
          index === editCommentIndex ? (
            <AddComment key={index} editingComent={obj} index={index} />
          ) : (
            <React.Fragment key={index}>
              <ListItem className={styles.ListItem} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={obj.user.fullName}
                    src={`${process.env.REACT_APP_API_URL}${obj.user.avatarUrl}`} />
                </ListItemAvatar>
                <ListItemText
                  primary={obj.user.fullName}
                  secondary={obj.text}
                />
                {
                  (obj.user._id === curentUserId) && (
                    <CommentEditMenu className={styles.editButtons} curentComment={obj} index={index} />
                  )}
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          )

        ))}
      </List>
      {(editCommentIndex === null) && <AddComment isCreationComment={true} />}
    </Paper>
  );
};
