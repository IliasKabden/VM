namespace('views.coinPanel');
views.coinPanel = (function () {
	var logpan, dispenser, coin,
		button_panel, costObject;
	
	function init() {
		dispenser = models.Dispenser;
		coin = models.Coin;
		logpan = views.logPanel;
		button_panel = document.getElementById('sub_panel_insert_button');
		util.event('click', button_panel, this, addPushEvent);
		
		if(arguments.length > 0)
			costObject = document.getElementById(arguments[0]);
		else if(!costObject)
			costObject = document.getElementById('total_cost');		// Default
	}
	
	function addPushEvent(e) {
		if(e.target.className !== 'coin_push') return;
		// invoke coinpush event to dispenser object
	    var Count = e.target.getAttribute('Count'),
			isPaper = e.target.getAttribute('paper'),
			returnArray, success, i;
			
	    if (Count > 0) {
			success = dispenser.setCoin(new coin(Count, isPaper));
			if(success) {
			  //  logpan.writeMessage(Count + 'рублей add.');
				updateCost();
			}
		} else {
			returnArray = dispenser.returnCoin();
			if(returnArray.length < 1) {
				logpan.writeMessage('');
			}
			for(i = 0; i < returnArray.length; i++) {
				logpan.writeMessage(returnArray[i].won + '');
				updateCost();	
			}
		}
	}
	
	function updateCost() {
		var cost = dispenser.getCurrentAmount();
		costObject.innerHTML = cost;
	}
	
	return {
		init: init,
		updateCost: updateCost
	};
}());