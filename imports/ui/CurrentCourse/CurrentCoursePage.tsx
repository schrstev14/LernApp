import React from 'react';
import { Header, Menu, Segment, Sidebar, Container } from 'semantic-ui-react'

const CurrentCoursePage = () => {

  const Content = [
    { _id: 1, course:'Math', topic: 'Binomische Formel',title: 'Erste Bin. Formel', description: '(a+b)*(a+b)...' },
    { _id: 2, course:'Math', topic: 'Binomische Formel', title: 'Zweite Bin. Formel',description: '(a-b)*(a-b)...' },
    { _id: 3, course:'Math', topic: 'Binomische Formel', title: 'Dritte Bin. Formel',description: '(a+b)*(a-b)...' },
  ];

  return (
    <div style={{ flexGrow: 1, padding: '1rem' }} >
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          icon='labeled'
          inverted
          vertical
          visible
          direction='left'
          width='thin'
        >
          <Menu.Item as='a'>
            Binomische Formel
      </Menu.Item>
          <Menu.Item as='a'>
            Topic 2
      </Menu.Item>
          <Menu.Item as='a'>
            Topic 3
      </Menu.Item>
          <Menu.Item as='a'>
            Quiz
      </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher>
          <Segment basic>
            <Header as='h1' style={{ textDecoration: 'underline' }}>Math</Header>
            <Container text>
              <ul>
                
                {Content.map(task => {
                  return (
                    <div>
                      <h2>
                        {task.title}
                      </h2>
                      <h3>
                        {task.description}
                      </h3>
                    </div>
                  )
                })}

              </ul>
            </Container>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  )
}

export default CurrentCoursePage;