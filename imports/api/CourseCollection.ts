import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema'

export const CourseCollection = new Mongo.Collection('course');

const CourseCollectionSchema = new SimpleSchema({
    title: { type: String },
    description: { type: String },
    imageURL: String
});
//@ts-ignore
CourseCollection.attachSchema(CourseCollectionSchema)

if (Meteor.isServer) {
    if (CourseCollection.find().count() == 0) {
        for (let i = 0; i < 20; i++) {
            CourseCollection.insert({

                title: `Test${i}`,
                description: `description${i}`,
                imageURL: ' /images/TestIcon.jpg'
            })
        }
    }
}