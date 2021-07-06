import { Mongo } from 'meteor/mongo';
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

export interface LastVisit {
    courseId: String,
    userId: String | null
}

export const LastVisitCollection = new Mongo.Collection<LastVisit>('LastVisited');

const LastVisitCollectionSchema = new SimpleSchema({
    courseId: String,
    userId: String
})

// @ts-ignore
LastVisitCollection.attachSchema(LastVisitCollectionSchema)

if (Meteor.isServer) {
    Meteor.publish('LastVisited', function publishLastVisited() {
        return (
            LastVisitCollection.find()
        )
    })
}

Meteor.methods({
    'LastVisited.save'({ courseId, userId }) {
        new SimpleSchema({
            courseId: { type: String, required: true },
            userId: { type: String, required: true },

        }, { requiredByDefault: false }).validate({ courseId, userId });

        if (Roles.userIsInRole(this.userId, ['User', 'Redakteur', 'Admin'])) {
            var test = LastVisitCollection.findOne({ userId: this.userId })

            if (test == undefined) {
                LastVisitCollection.insert({
                    courseId: courseId,
                    userId: userId
                });
            } else {
                LastVisitCollection.update(test._id, {
                    $set: {
                        courseId: courseId,
                        userId: userId
                    }
                })
            }
        } else {
            throw new Meteor.Error('No Account', 'You have no Account');
        }
    }
});