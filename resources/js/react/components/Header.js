import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Toolbar, Typography, Button, Avatar, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Dialog from "./Dialog/Dialog.js"

const useStyles = makeStyles(theme => ({
    container: {
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
    },

    toolbar: {
        display: "flex",
        justifyContent: "space-between",

        "& a": {
            color: theme.palette.common.black,
            textDecoration: "none"
        }
    },

    avatar: {
        marginRight: -10
    },

    profile: {
        display: "flex",
        alignItems: "center"
    }
}))

const Header = ({ isLoggedIn, user }) => {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6">
                    <Link to="/">
                        Yet Another Blog
                    </Link>
                </Typography>

                {isLoggedIn ? (
                    <div className={classes.profile}>
                        <Typography>
                            {user.username}
                        </Typography>
                        
                        <IconButton disableRipple disableFocusRipple className={classes.avatar}>
                            <Avatar alt={user.username} src={user.avatar_url}/>
                        </IconButton>
                    </div>
                ) : (
                    <div>
                        <Button onClick={Dialog.login}>Login</Button>
                        <Button onClick={Dialog.register}>Register</Button>
                    </div>
                )}
            </Toolbar>
        </div>
    )
}

const mapStateToProps = reducers => ({
    isLoggedIn: reducers.auth.isLoggedIn,
    user: reducers.auth.user
})

export default connect(mapStateToProps)(Header)