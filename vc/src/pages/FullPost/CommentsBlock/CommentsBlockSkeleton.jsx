import React from "react";


import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import { SideBlock } from "../../../components";


export const CommentsBlockSkeleton = ({ items, children, isLoading }) => {
  return (
    <SideBlock title="Комментарии">
      <List>
        {[...Array(5)].map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Skeleton variant="circular" width={40} height={40} />
              </ListItemAvatar>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Skeleton variant="text" height={25} width={120} />
                <Skeleton variant="text" height={18} width={230} />
              </div>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
