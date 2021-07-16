import React from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema';
import SimpleSchemaBridge from 'uniforms-bridge-simple-schema-2';
import { Container, Message, Popup } from 'semantic-ui-react'
import { AutoForm, RadioField, SubmitField } from '/imports/ui/uniforms-react';

SimpleSchema.extendOptions(['uniforms']);

const CustomSubmitField = () => (
  <div style={{ textAlign: 'left' }}>
    <Popup
      content='Changed'
      on='click'
      pinned
      trigger={<SubmitField value='Change' />}
    />
  </div>
)

const manageSchema = new SimpleSchema({
  user: { type: Object },
  "user._id": {
    type: String,
    // @ts-ignore
    uniforms: {
      disabled: true
    }
  },
  role: { type: Object },
  "role._id": {
    type: String,
    // @ts-ignore
    uniforms: {
      //type: Checkbox,
      component: RadioField,
      allowedValues: ['Admin', 'User', 'Redakteur'],
    }
  },
})

const manageSchemaBridge = new SimpleSchemaBridge(manageSchema);

function RoleChange(newValue: String): void {
  // @ts-ignore
  Meteor.callAsync('rolechange', newValue.user._id, newValue.role._id)
  console.log('User:', newValue.user._id, ', Role changed to:', newValue.role._id)
}


const UserManagement = () => {
  const user = useTracker(() => Meteor.user());
  const UserRoles = useTracker(() => Meteor.roleAssignment.find({}).map((roles) => {
    const Username = Meteor.users.find(roles?.user?._id).map((name) => <h3 key={name._id}>Username: {name.username}</h3>)
    return (
      <Container key={roles.key} text style={{ borderBottom: 'solid', borderWidth: '2.5px', padding: '1rem' }}>
        {Username}
        <AutoForm
          key={roles._id}
          schema={manageSchemaBridge}
          submitField={CustomSubmitField}
          onSubmit={RoleChange}
          model={roles}
        />
      </Container>
    )
  }))
  return (
    <div style={{ padding: '1rem' }} >
      {Roles.userIsInRole(user, ['Admin']) ? (
        <div style={{ flexGrow: 1, padding: '1rem', display: 'flex' }}>
          <Container text>
            <h1 className='Title'>User Managment</h1>
            {UserRoles}
          </Container>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <Message
            color='red'
            negative
            icon='delete'
            header='Not Allowed'
            content='You dont have the Permission to do something'
          />
          <h1>Here is Nothing for you</h1>
        </div>
      )}
    </div>
  )
}

export default UserManagement;