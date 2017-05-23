import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Messages = new Mongo.Collection('messages');

Meteor.subscribe('messages', 5);

Template.hello.helpers({
	messages: function (){
		return Messages.find({}, {
			sort: { timestamp: -1 }
		});
	}
});

Template.hello.events({
	'submit .chat-form': function (evt){
		evt.preventDefault();
		var text=evt.target.message.value;
		console.log(text);
		Meteor.call('insertMessage', text, function(err, result) {
			if (err){
				console.log(err);
				alert(err.reason);
			}
			else{
				console.log("Message insterted with id: ", result);
				evt.target.message.value = '';
			}
		});
	}
});

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});
