import { Meteor } from 'meteor/meteor';
Messages = new Mongo.Collection('messages');

Meteor.startup(() => {
	Meteor.methods({
		insertMessage: function(text) {
		if(!this.userId) {
			throw new Meteor.Error("logged-out",
				"The user must be logged-in to post a comment.");
		}
			var user = Meteor.users.findOne(this.userId);
			return Messages.insert({
				userId: this.userId,
				username: user.username,
				text: text,
				timestamp: Date.now()
			});
		}
	
	});
   
	Meteor.publish('messages', function(limit) {
		if(this.userId) {
			return Messages.find({}, {
				limit:  limit || 5, 
				sort: { timestamp : -1 }	
			});
		}
		this.ready();
	});  
});
