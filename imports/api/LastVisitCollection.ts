import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

export const LastVisitCollection = new Mongo.Collection('LastVisited');

const LastVisitCollectionSchema = new SimpleSchema({
    courseId: String,
    userId: String 
})

// @ts-ignore
LastVisitCollection.attachSchema(LastVisitCollectionSchema)

if (Meteor.isServer) {
    Meteor.publish('LastVisited', function publishLastVisited() {
        return (
            LastVisitCollection.find({ userId: this.userId })
        )
    })
}

// Meteor.methods({
//     'LastVisited.save'({ _id, courseId, userId }) {
//         new SimpleSchema({
//             _id: { type: String },
//             courseId: { type: String, required: true },
//             userId: { type: String, required: true },

//         }, { requiredByDefault: false }).validate({ _id, courseId, userId });
//         if (_id) {
//             LastVisitCollection.update(_id, {
//                 $set: {
//                     courseId: courseId,
//                     userId: userId
//                 }
//             })
//         }
//         else {
//             LastVisitCollection.insert({
//                 //@ts-ignore
//                 courseId: courseId,
//                 userId: userId
//             });
//         }
//     }
// });