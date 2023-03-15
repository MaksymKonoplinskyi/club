import React from 'react'
import Skeleton from "@mui/material/Skeleton"
import { List, ListItem, ListItemButton, ListItemIcon } from '@mui/material'
import TagIcon from "@mui/icons-material/Tag"

export const TagsSkeleton = () => {

    return (
        <>
            <List>
                {[...Array(5)].map((name, i) => (
                    <ListItem disablePadding key={i} >
                        <ListItemButton >
                            <ListItemIcon >
                                <TagIcon />
                            </ListItemIcon>
                            <Skeleton width={100} height={30} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );
}
