import React from 'react';
import { Menu, Image, Icon } from 'semantic-ui-react'

const Footer = () => {
  return (
    <Menu secondary>
      <Menu.Item
        name='S_Schroeter_'
        icon='file code'
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='Coding Pioneers Gmbh'
          icon={<Image size='mini' src='/images/coding_pioneers.png' />}
        />
      </Menu.Menu>
    </Menu>
  )
}

export default Footer;