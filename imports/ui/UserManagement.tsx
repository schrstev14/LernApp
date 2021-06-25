import React from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema';
import SimpleSchemaBridge from 'uniforms-bridge-simple-schema-2';
import { Button, Modal, List, Item, Loader, Checkbox } from 'semantic-ui-react'
import { AutoForm, RadioField, SubmitField } from '/imports/ui/uniforms-react';

SimpleSchema.extendOptions(['uniforms']);


const manageSchema = new SimpleSchema({
  user: { type: Object },
  "user._id": {
    type: String
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
  //Roles.removeUsersFromRoles(newValue.user._id, ['Admin','User','EDIT','Redakteur'])
  //Roles.addUsersToRoles(newValue.user._id, newValue.role._id);
  //Roles.setUserRoles(newValue.user._id, newValue.role._id)
  //Roles.setUserRoles('rzWTKLjX5xwwTpCSy', ['User']) //<-- funktioniert nur auf Server
  // @ts-ignore
  Meteor.callAsync('rolechange', newValue.user._id, newValue.role._id)
  console.log(newValue.user._id, newValue.role._id)
}

const UserManagement = () => {
  const user = useTracker(() => Meteor.user());
  const UserRoles = useTracker(() => Meteor.roleAssignment.find({}).map((roles) => {
    // console.log(roles)
    return (
      <div>
        <AutoForm
          schema={manageSchemaBridge}
          //onChange={RoleChange}
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