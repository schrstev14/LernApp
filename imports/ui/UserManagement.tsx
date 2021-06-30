import React from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema';
import SimpleSchemaBridge from 'uniforms-bridge-simple-schema-2';
import { Button, Modal, List, Item, Loader, Checkbox, Container } from 'semantic-ui-react'
import { AutoForm, RadioField, SubmitField } from '/imports/ui/uniforms-react';

SimpleSchema.extendOptions(['uniforms']);

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
    return (
      <Container key={roles.key} text style={{ border: 'solid', borderWidth: '2px', borderCollapse: 'collapse', padding: '1rem' }}>
        <AutoForm
          schema={manageSchemaBridge}
          //onChange={RoleChange}
          onSubmit={RoleChange}
          model={roles}
          key={roles.key}
        />
      </Container>
    )
  }))
  return (
    <div style={{ padding: '1rem' }} >
      {Roles.userIsInRole(user, ['Admin']) ? (
        <div style={{ flexGrow: 1, padding: '1rem', display: 'flex' }}>
          <div>
            {UserRoles}
          </div>
        </div>
      ) : (
          <div style={{ backgroundColor: 'red' }}>
            <h1>Not Allowed</h1>
          </div>
        )}
    </div>
  )
}

export default UserManagement;