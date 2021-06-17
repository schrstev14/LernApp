import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema'
import { ReactiveVar } from 'meteor/reactive-var'

export interface Course {
    title: string
    description: string,
    imageURL: string,
    _id?: string 
}

export const editCourseId = new ReactiveVar<string | null>(null)

export const CourseCollection = new Mongo.Collection<Course>('courses');

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