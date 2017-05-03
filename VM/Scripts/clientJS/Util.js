var namespace = function namespace(namespace) {
	if(!namespace) return Error('No arguments');
	namespace = namespace.replace(/^\s*(\S+)\s*$/, '$1');	
	var spaceArray = namespace.split(/\s*\.\s*/)
		, i,
		currentSpace = this;
	
	if(spaceArray) {
		i = spaceArray.length;
		spaceArray.reverse();	
	}
	
	for(i -= 1; i >= 0; i -= 1) {
		if(!currentSpace[spaceArray[i]]) {
			currentSpace[spaceArray[i]] = {};
		}
		currentSpace = currentSpace[spaceArray[i]];
	}
};


namespace('util');
util = {
	generateCapacity: function (max) {
		return (Math.floor(Math.random() * 100)) % max;
	},
	event: function (type, obj, context, func) {
		obj.addEventListener(type, function (e) {
			func.call(context, e);
		});
	}
};
