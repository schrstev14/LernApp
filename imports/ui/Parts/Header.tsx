import React, { useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import {Meteor} from 'meteor/meteor'
import { useHistory, useLocation } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'


const Header = () => {
  const history = useHistory();
  const location = useLocation()
  const user = useTracker(() => Meteor.user());

  useEffect(() => console.log(location), [location])

  function logout(){
    history.push('/login')
    Meteor.logout()
  }

  return (
    <Menu pointing secondary>
      <Menu.Item
        name='Home'
        active={location.pathname === '/'}
        onClick={() => history.push('/')}
      />
      <Menu.Item
        name='Courses'
        active={location.pathname === '/courses'}
        onClick={() => history.push('/courses')}
      />
      {Roles.userIsInRole(user, ['EDIT']) ? (
        <Menu.Item
          name='Edit'
          active={location.pathname === '/edit-page'}
          onClick={() => history.push('/edit-page')}
        />) : ('')
      }
      {Roles.userIsInRole(user, ['Admin']) ? (
        <Menu.Item
          name='UserManagement'
          active={location.pathname === '/user-management'}
          onClick={() => history.push('/user-management')}
        />) : ('')
      }
      <Menu.Menu position='right'>
        <Menu.Item
          name={user ? ('logout'):('Login')}
          active={location.pathname === '/login'}
          onClick={() => logout()}
        />
      </Menu.Menu>
    </Menu>
  )
}

export default Header;