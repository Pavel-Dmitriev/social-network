import React from 'react'
import styles from "./users.module.css"
import avatar from "../../assets/images/avatar.png"
import {NavLink} from "react-router-dom"

let User = ({user, followingInProgress, unfollow, follow}) => {

  return (
    <div>
      <div>
        <NavLink to={'/profile/' + user.id}>
          <img src={user.photos.small != null ? user.photos.small : avatar} alt="photo" className={styles.userPhoto}/>
        </NavLink>
        <div>
          {
            user.followed
              ? <button
                disabled={followingInProgress.some(id => id === user.id)}
                onClick={() => {
                  unfollow(user.id)
                }}
              >
                Unfollow
              </button>
              : <button
                disabled={followingInProgress.some(id => id === user.id)}
                onClick={() => {
                  follow(user.id)
                }}
              >
                Follow
              </button>
          }
        </div>
      </div>

      <div>{user.name}</div>
      <div>{user.status}</div>

      <div>
        <span>{'u.location.country'}</span>
        <br/>
        <span>{'u.location.city'}</span>
      </div>
    </div>
  )
}

export default User