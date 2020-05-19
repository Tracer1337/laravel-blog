import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import Avatar from "../Avatar.js"
import Auth from "../Auth.js"
import Icon from "../Icon.js"

import { logout } from "../../redux/actions.js"
import Storage from "../../utils/Storage.js"

const width = 176
const marginTop = 8

const links = [
    {
        icon: "person",
        label: "View Profile"
    },
    {
        icon: "tune",
        label: "Edit Profile",
        to: "/edit-profile"
    },
    {
        icon: "view-list",
        label: "My Comments",
        to: "/my-comments"
    },
    {
        icon: "folder-open",
        label: "My Posts",
        to: "/my-blogposts",
        role: "author"
    },
    {
        icon: "add-circle",
        label: "Create Post",
        to: "/create-post",
        role: "author"
    },
    {
        icon: "lock",
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
        Storage.removeLocal("JWTToken")
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
                                    <Icon type={icon} fontSize={24} className="icon"/>
                                    <span className="label">
                                        {label}
                                    </span>
                                </li>
                            </Link>
                        </Auth>
                    ))}

                    <li className="menu-item" onClick={this.handleLogout.bind(this)}>
                        <Icon type="exit-to-app" fontSize={24} className="icon"/>
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