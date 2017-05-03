namespace('models.Dispenser');
var models;
models.Dispenser = (function () {
    var inventory = [];		
    var insertedCoins = [];
    var totalRecord = 0;	
    var currentAmount = 0;	

    return {
        getCurrentAmount: function () {
            return currentAmount;
        }
		, setCoin: function (coin) {
		    if (!coin instanceof models.Coin) return false;
		    currentAmount += coin.getPrice();
		    return true;
		}
		, returnCoin: function () {
		    var thousand = Math.floor(currentAmount / 1000);
		    var hundred = Math.floor((currentAmount % 1000) / 100);
		    var ten = Math.floor((currentAmount % 100) / 10);
		    var returnCoinSet = [], i;

		    for (i = 0; i < thousand; i++) {
		        returnCoinSet.push(new models.Coin(1000, 'paper'));
		    }
		    for (i = 0; i < hundred; i++) {
		        returnCoinSet.push(new models.Coin(100));
		    }
		    for (i = 0; i < ten; i++) {
		        returnCoinSet.push(new models.Coin(10));
		    }

		    currentAmount = 0;
		    return returnCoinSet;
		}
		, setInventory: function (items) {
		    inventory = items;
		}
		, getBeverage: function (code) {
		    if (inventory.length < 1) return undefined;
		    for (var i in inventory) {
		        if (code === inventory[i].code) {
		            if (inventory[i].Count === 0) {
		                alert(Error(inventory[i].Name + " нет в наличии."));
		            } else if (currentAmount >= inventory[i].Price) {
		                currentAmount -= inventory[i].Price;
		                inventory[i].Count -= 1;
		                return inventory[i];
		            }
		            else
		                alert("Недостаточно денег. Пожалуйста, введите монету.");
		        }
		    }
		}
    };
})();

namespace('models.Coin');

models.Coin = function (won, isPaper) {
    this.won = parseInt(won, 10);
    this.isPaper = Boolean(isPaper);
};

models.Coin.prototype = {
    isCoin: function () {
        return (this.type === 'coin');
    }
	, getPrice: function () {
	    return this.won;
	}
};

namespace('models.Product');

models.Product = function (code, Name, Price, Count, SrcImg, description) {
    this.code = code;
    this.Name = Name;
    this.Price = Price;
    this.Count = Count;
    this.SrcImg = SrcImg;
    this.description = description;
}

models.Product.prototype = {

};