const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(response => {
        if(response) {
            location.reload();
        }
    });
}

ApiConnector.current(response => {
    if(response) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();
func = () => {
    ApiConnector.getStocks(response => {
        if(response) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}
func();
setInterval(() => func(), 60000);
const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Деньги зачислены");
        } else {
            moneyManager.setMessage(false, response.error);
        }
    })
}
moneyManager.conversionMoneyCallback = () => {
    ApiConnector.convertMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Деньги сконвертированы");
        } else {
            moneyManager.setMessage(false, response.error);
        }
    })
}
moneyManager.sendMoneyCallback = () => {
    ApiConnector.transferMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Перевод выполнен");
        } else {
            moneyManager.setMessage(false, response.error);
        }
    })
}
const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if(response) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
})
favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(false, "Пользователь добавлен в избранное");
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    })
}
favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(false, "Пользователь удален из избранного");
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    })
}
