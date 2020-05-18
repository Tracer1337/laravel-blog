import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import PersonIcon from "@material-ui/icons/PersonOutlined"
import TuneIcon from "@material-ui/icons/Tune"
import FolderOpenIcon from "@material-ui/icons/FolderOpen"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import ViewListIcon from "@material-ui/icons/ViewList"
import LockIcon from "@material-ui/icons/Lock"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"

import Avatar from "../Avatar.js"
import Auth from "../Auth.js"

import { logout } from "../../redux/actions.js"

const width = 176
const marginTop = 8

const links = [
    {
        icon: PersonIcon,
        label: "View Profile"
    },
    {
        icon: TuneIcon,
        label: "Edit Profile",
        to: "/edit-profile"
    },
    {
        icon: ViewListIcon,
        label: "My Comments",
        to: "/my-comments"
    },
    {
        icon: FolderOpenIcon,
        label: "My Posts",
        to: "/my-blogposts",
        role: "author"
    },
    {
        icon: AddCircleOutlineIcon,
        label: "Create Post",
        to: "/create-post",
        role: "author"
    },
    {
        icon: LockIcon,
        label: "Admin Panel",
        to: "/admin",
        role: "admin"
    }
]

class Menu extends React.Component {
    constructor(props) {
        super(props)
        
        const rect = this.props.anchor.getBoundingClientRect()
        this.position = { 
            x: rect.x + rect.width - width,
            y: rect.y + rect.height + marginTop
        }

        this.links = links

        this.userlink = "/user/" + this.props.profile.id
        this.links[0].to = this.userlink
    }

    handleLogout() {
        localStorage.removeItem("JWTToken")
        this.props.logout()
    }

    render() {
        const { profile } = this.props

        return (
            <div className="menu" style={{ transform: `translate(${this.position.x}px, ${this.position.y}px)` }}>
                <Link to={this.userlink}>
                    <div className="menu-profile">
                        <Avatar size={58}/>
                        <span className="first">{profile.full_name}</span>
                        <span className="last">{profile.role}</span>
                    </div>
                </Link>

                <hr />

                <ul>
                    {links.map(({ icon, label, to, role }, i) => (
                        <Auth role={role} key={i}>
                            <Link to={to}>
                                <li className="menu-item">
                                    {React.createElement(icon, { style: { fontSize: 24 }, className: "icon" })}
                                    <span className="label">
                                        {label}
                                    </span>
                                </li>
                            </Link>
                        </Auth>
                    ))}

                    <li className="menu-item" onClick={this.handleLogout.bind(this)}>
                        {React.createElement(ExitToAppIcon, { style: { fontSize: 24 }, className: "icon" })}
                        <span className="label">
                            Logout
                        </span>
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = store => ({
    profile: store.auth.profile
})

export default connect(mapStateToProps, { logout })(Menu)