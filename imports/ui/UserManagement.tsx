import React from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema';
import SimpleSchemaBridge from 'uniforms-bridge-simple-schema-2';
import { Button, Modal, List, Item, Loader } from 'semantic-ui-react'
import { AutoForm, RadioField, SubmitField } from '/imports/ui/uniforms-react';

SimpleSchema.extendOptions(['uniforms']);


const manageSchema = new SimpleSchema({
  user: {type: Object},
  "user._id": {
    type: String
  },
  role: {type: Object},
  "role._id": {
    type: String,
    label: 'Role'
  }
  // uniforms:{
  //   component: RadioField
})

const manageSchemaBridge = new SimpleSchemaBridge(manageSchema);

function RoleChange() {
  /* 
  Roles.addUsersToRoles(this.userId, role);
  Roles.removeUsersFromRoles(this.userId, role) 
  */

}

const UserManagement = () => {
  const user = useTracker(() => Meteor.user());
  const UserRoles = useTracker(() => Meteor.roleAssignment.find({}).map((roles) => {
    console.log(roles)
    return (
      <div>
        <AutoForm
          schema={manageSchemaBridge}
          onSubmit={RoleChange}
          model={roles}
        />
      </div>
    )
  }))
  return (
    <div style={{ padding: '1rem' }} >
      {Roles.userIsInRole(user, ['Admin']) ? (

        <div style={{ flexGrow: 1, padding: '1rem', display: 'flex' }}>
          <div style={{ width: '20rem' }}>
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