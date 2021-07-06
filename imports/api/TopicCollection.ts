import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema'
import { ReactiveVar } from 'meteor/reactive-var'

import { CourseCollection } from '/imports/api/CourseCollection';
import { useTracker } from 'meteor/react-meteor-data'
export interface Topic {
    courseId: string,
    title: string,
    description: string,
    content: string,
    _id?: string
}

export const editTopicId = new ReactiveVar<string | null>(null)

export const TopicCollection = new Mongo.Collection<Topic>('topic');

const TopicCollectionSchema = new SimpleSchema({
    courseId: String,
    title: String,
    description: String,
    content: String
})

// @ts-ignore
TopicCollection.attachSchema(TopicCollectionSchema)

if (Meteor.isServer) {
    if (TopicCollection.find().count() == 0) {
        const course = useTracker(() => CourseCollection.find({}).map((course) => {
            for (let i = 0; i < 3; i++) {
                TopicCollection.insert({
                    courseId: course._id ?? 'fnord',
                    title: `Test${i}`,
                    description: `description${i}`,
                    content: `# test${i}`
                })
            }
        }))
    }
}

if (Meteor.isServer) {
    Meteor.publish('Topics', function publishTopics() {
        return (
            TopicCollection.find()
        )
    })
}

Meteor.methods({
    'topics.save'({ _id, courseId, title, description, content }) {
        new SimpleSchema({
            _id: { type: String },
            courseId: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: String, required: true },
            content: { type: String, required: true },

        }, { requiredByDefault: false }).validate({ _id, courseId, title, description, content });

        if (Roles.userIsInRole(this.userId, ['EDIT'])) {
            if (_id) {
                TopicCollection.update(_id, {
                    $set: {
                        courseId: courseId,
                        title: title,
                        description: description,
                        content: content
                    }
                })
            }
            else {
                TopicCollection.insert({
                    courseId: courseId,
                    title: title,
                    description: description,
                    content: content
                });
            }
        } else {
            throw new Meteor.Error('No Permission', 'You have no Permission to do that');
        }
    }
});

Meteor.methods({
    'topicremove'(id) {
        new SimpleSchema({
            id: { type: String }
        }).validate({ id });
        if (Roles.userIsInRole(this.userId, ['EDIT'])) {
            TopicCollection.remove(id)
        } else {
            throw new Meteor.Error('No Permission', 'You have no Permission to do that');
        }
    }
});

Meteor.methods({
    'course.topicremove'(id) {
        new SimpleSchema({
            id: { type: String }
        }).validate({ id });
        if (Roles.userIsInRole(this.userId, ['EDIT'])) {
            TopicCollection?.find({ courseId: id }).map((topic) =>
                //@ts-ignore
                Meteor.callAsync('topicremove', topic._id)
            )
        } else {
            throw new Meteor.Error('No Permission', 'You have no Permission to do that');
        }
    }
});

