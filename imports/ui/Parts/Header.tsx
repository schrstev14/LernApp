import React, { useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { useHistory, useLocation } from 'react-router-dom'
import { Menu, Popup, Modal } from 'semantic-ui-react'


const Header = () => {
  const history = useHistory();
  const location = useLocation()
  const user = useTracker(() => Meteor.user());

  useEffect(() => console.log(location), [location])

  function logout() {
    history.push('/login')
    Meteor.logout()
  }
  const style = {
    borderRadius: 0,
    opacity: 0.75,
    padding: '1em.',
  }
  const Delay = 1500;

  const loggin = <Menu.Item
    name={user ? ('Logout') : ('Login')}
    icon={user ? ('sign out') : ('sign in')}
    active={location.pathname === '/login'}
    onClick={user ? (console.log) : (() => history.push('/login'))}
  />
  return (
    <Menu tabular stackable>
      <Popup content='Your HomePage' trigger={<Menu.Item
        name='Home'
        icon='home'
        active={location.pathname === '/'}
        onClick={() => history.push('/')}
      />}
        mouseEnterDelay={Delay}
        style={style}
        on='hover' />

      <Popup content='All Courses to Learn' trigger={
        <Menu.Item
          name='Courses'
          icon='file'
          active={location.pathname === '/courses'}
          onClick={() => history.push('/courses')}
        />}
        mouseEnterDelay={Delay}
        style={style}
        on='hover' />

      {Roles.userIsInRole(user, ['EDIT']) ? (
        <Popup content='Edit all Content' trigger={
          <Menu.Item
            name='Edit'
            icon='edit'
            active={location.pathname === '/edit-page'}
            onClick={() => history.push('/edit-page')}
          />}
          mouseEnterDelay={Delay}
          style={style}
          on='hover' />) : ('')
      }
      {Roles.userIsInRole(user, ['Admin']) ? (
        <Popup content='Manage the Role`s of the Users' trigger={
          <Menu.Item
            name='UserManagement'
            icon='address card'
            active={location.pathname === '/user-management'}
            onClick={() => history.push('/user-management')}
          />}
          mouseEnterDelay={Delay}
          style={style}
          on='hover'
          flowing />) : ('')

      }
      <Menu.Menu position='right'>
        {user ?
          (
            <Modal
              trigger={loggin}
              header={'Warning !'}
              content={'You will be logged out !'}
              actions={[{ key: 'not', content: 'abort', negative: true }, { key: 'done', content: 'Yes', positive: true, onClick: () => logout() }]}
            />)
          : (loggin)
        }
      </Menu.Menu>
    </Menu>
  )
}

export default Header;