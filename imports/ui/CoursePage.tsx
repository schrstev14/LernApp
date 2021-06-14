import React from 'react';
import { useHistory } from 'react-router-dom'
import { Item, Container, Progress } from 'semantic-ui-react'

const CoursePage = () => {
  const history = useHistory();
  return (
    <div style={{ padding: '1rem' }} >
      <Container text>
        <Item.Group>
          <Item onClick={() => history.push('/current-course')}>
            <Item.Image size='tiny' src='/images/wireframe/image.png' />

            <Item.Content>
              <Item.Header as='a'>HTML</Item.Header>
              <Item.Meta>Description</Item.Meta>
              <Item.Description>
                Here you learn everything about HTML
              </Item.Description>
              <Item.Extra><Progress value='0' total='5' progress='percent' indicating/></Item.Extra>
            </Item.Content>
          </Item>

          <Item onClick={() => history.push('/current-course')}>
            <Item.Image size='tiny' src='/images/wireframe/image.png' />

            <Item.Content>
              <Item.Header as='a'>Math</Item.Header>
              <Item.Meta>Description</Item.Meta>
              <Item.Description>
                Here you learn everything about Math
              </Item.Description>
              <Item.Extra><Progress value='1' total='5' progress='percent' indicating/></Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>

      </Container>
    </div>
  )
}

export default CoursePage;