import React from "react"
import { ListItem as MuiListItem, ListItemSecondaryAction, ListItemText, IconButton, Grid, Tooltip, withStyles } from "@material-ui/core"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"

const styles = {
    listItem: {
        padding: "0 0 0 16px"
    }
}

const ListItem = ({ value, onClick, onRemove, classes }) => (
    <MuiListItem button={!!onClick} onClick={onClick} className={classes.listItem}>
        <ListItemText>{value}</ListItemText>

        <ListItemSecondaryAction>
            <Grid container>

                {onRemove && (
                    <Grid item>
                        <Tooltip
                            title="Remove"
                            placement="left"
                        >
                            <IconButton
                                onClick={onRemove}
                                edge="end"
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                )}

            </Grid>
        </ListItemSecondaryAction>
    </MuiListItem>
)

export default withStyles(styles)(ListItem)