import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import PersonIcon from "@material-ui/icons/PersonOutlined"
import TuneIcon from "@material-ui/icons/Tune"
import FolderOpenIcon from "@material-ui/icons/FolderOpen"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import ViewListIcon from "@material-ui/icons/ViewList"
import LockIcon from "@material-ui/icons/Lock"

import Avatar from "./Avatar.js"

const width = 176
const marginTop = 8

const links = [
    {
        icon: PersonIcon,
        label: "View Profile",
        to: "/profile"
    },
    {
        icon: TuneIcon,
        label: "Edit Profile",
        to: "/edit-profile"
    },
    {
        icon: FolderOpenIcon,
        label: "My Posts",
        to: "/my-blogposts"
    },
    {
        icon: AddCircleOutlineIcon,
        label: "Create Post",
        to: "/create-blogpost"
    },
    {
        icon: ViewListIcon,
        label: "My Comments",
        to: "/my-comments"
    },
    {
        icon: LockIcon,
        label: "Admin Panel",
        to: "/admin"
    },
]

class Menu extends React.Component {
    constructor(props) {
        super(props)
        
        const rect = this.props.anchor.getBoundingClientRect()
        this.position = { 
            x: rect.x + rect.width - width,
            y: rect.y + rect.height + marginTop
        }
    }

    render() {
        const { profile } = this.props

        return (
            <div className="menu" style={{ transform: `translate(${this.position.x}px, ${this.position.y}px)` }}>
                <Link to="/profile">
                    <div className="menu-profile">
                        <Avatar size={58}/>
                        <span className="first">{profile.username}</span>
                        <span className="last">{profile.role}</span>
                    </div>
                </Link>

                <hr />

                <ul>
                    {links.map(({ icon, label, to }) => (
                        <Link to={to}>
                            <li className="menu-item">
                                {React.createElement(icon, { style: { fontSize: 24 }, className: "icon" })}
                                <span className="label">
                                    {label}
                                </span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = store => ({
    profile: store.auth.profile
})

export default connect(mapStateToProps)(Menu)