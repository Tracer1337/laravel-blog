### Permissions

* manage => create, update, delete

* blogpost
    * create
    * delete-any
    * like
    * recommend

* topic
    * manage

* tag
    * manage

* user
    * update
    * delete-any
    * view
    * follow

* comment
    * create
    * delete-any

* roles
    * view

### Roles

* User
    * blogpost.like

    * comment.create

    * user.view
    * user.follow

* Author
    * blogpost.create
    * blogpost.like

    * topic.create

    * tag.create

    * user.view
    * user.follow

    * comment.create

* Admin
    * *
