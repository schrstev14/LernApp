import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema'
import { ReactiveVar } from 'meteor/reactive-var'
import { ValidatedMethod } from 'meteor/mdg:validated-method';

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

if (Meteor.isServer) {
    Meteor.publish('Courses', function publishCourses() {
        return (
            CourseCollection.find()
        )
    })
}

Meteor.methods({
    'courses.save'({ _id, title, description, imageURL }) {
        new SimpleSchema({
            _id: { type: String },
            title: { type: String },
            description: { type: String },
            imageURL: { type: String }
        }).validate({ _id, title, description, imageURL });
        if (_id) {
            CourseCollection.update(_id, {
                $set: {
                    title: title,
                    description: description,
                    imageURL: imageURL
                }
            });
        } else {
            CourseCollection.insert({
                title: title,
                description: description,
                imageURL: imageURL
            });
        }
    }
});
