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

  return (
    <Menu tabular>
      <Popup content='HomePage' trigger={<Menu.Item
        name='Home'
        icon='home'
        active={location.pathname === '/'}
        onClick={() => history.push('/')}
      />}
        mouseEnterDelay={Delay}
        style={style} />

      <Popup content='All Courses' trigger={
        <Menu.Item
          name='Courses'
          icon='file'
          active={location.pathname === '/courses'}
          onClick={() => history.push('/courses')}
        />}
        mouseEnterDelay={Delay}
        style={style} />

      {Roles.userIsInRole(user, ['EDIT']) ? (
        <Popup content='EditPage' trigger={
          <Menu.Item
            name='Edit'
            icon='edit'
            active={location.pathname === '/edit-page'}
            onClick={() => history.push('/edit-page')}
          />}
          mouseEnterDelay={Delay}
          style={style} />) : ('')
      }
      {Roles.userIsInRole(user, ['Admin']) ? (
        <Popup content='User Managment System' trigger={
          <Menu.Item
            name='UserManagement'
            icon='address card'
            active={location.pathname === '/user-management'}
            onClick={() => history.push('/user-management')}
          />}
          mouseEnterDelay={Delay}
          style={style} />) : ('')

      }
      <Menu.Menu position='right'>
        <Menu.Item
          name={user ? ('logout') : ('Login')}
          icon={user ? ('sign out') : ('sign in')}
          active={location.pathname === '/login'}
          onClick={() => logout()}
        />
        {/* <Modal
          trigger={
            <Menu.Item
              name={user ? ('logout') : ('Login')}
              icon={user ? ('sign out') : ('sign in')}
              active={location.pathname === '/login'}
            />}
          header={'Warning !'}
          content={'You will be logged out'}
          actions={['abort', { key: 'done', content: 'Yes', positive: true, onClick: () => logout() }]}
        /> */}


      </Menu.Menu>
    </Menu>
  )
}

export default Header;