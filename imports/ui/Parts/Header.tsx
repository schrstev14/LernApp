import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'


const Header = () => {
  const history = useHistory();
  const location = useLocation()

  useEffect(() => console.log(location), [location])

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
      <Menu.Item
        name='Markdown-Editor'
        active={location.pathname === '/markdown-editor'}
        onClick={() => history.push('/markdown-editor')}
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='logout'
          active={location.pathname === '/login'}
          onClick={() => history.push('/login')}
        />
      </Menu.Menu>
    </Menu>
  )
}

export default Header;