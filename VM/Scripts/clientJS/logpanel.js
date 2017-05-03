namespace('views.logPanel');
views.logPanel = (function () {
	var messageObject;
	
	function init() {
		var clearButton = document.getElementById('clear_log');
		util.event('click', clearButton, this, this.clrMessageBox);
		if(arguments.length > 0)
			messageObject = document.getElementById(arguments[0]);
		else if(!messageObject)
			messageObject = document.getElementById('message');		// Default
	}
	
	return {
		init: init,
		writeMessage: function (msg) {
			messageObject.innerHTML += msg + "\n";
		},
		clrMessageBox: function () {
			messageObject.innerHTML = '';
		}
	};
}());