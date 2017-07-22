

var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: "", 
    database: "Bamazon"
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log();
    displayStore();
    purchase();

})

var displayStore = function(){
    connection.query("SELECT * FROM Products", function(error,results){
        if (error) throw (error);
        for (var i = 0; i < results.length; i++){
            console.log("Product ID: " + results[i].ItemID + " --- Product Name: " + results[i].ProductName + " --- Department : " + results[i].DepartmentName + " --- Stock Quantity: " + results[i].StockQuantity + " --- Price: $" + results[i].Price);
        }
    })
}



var purchase = function() {
    connection.query("SELECT * FROM Products", function(err, res) {
        inquirer.prompt({
            name: "ID",
            type: "input",
            message: "Please enter the product ID of the store item you would like to purchase."
        }).then(function(answer1) {
            if(answer1.ID > res.length){
                console.log("Sorry, you've entered an invalid product ID. Please try again.");
                connection.end();
            }
            for (var i = 0; i < res.length; i++) {
                if (res[i].ItemID == parseInt(answer1.ID)) {
                    var userpick = res[i];
                    inquirer.prompt({
                        name: "amount",
                        type: "input",
                        message: "Great! Please enter the the quantity of this item that you would like to purchase today."
                    }).then(function(answer) {
               
                        if (userpick.StockQuantity > parseInt(answer.amount)) {
                            var stockRemaining = userpick.StockQuantity - parseInt(answer.amount);
                    
                            connection.query("UPDATE Products SET ? WHERE ?", [{
                                StockQuantity : stockRemaining
                            }, {
                                ItemID: userpick.ItemID
                            }], function(err, res) {
                                console.log();
                                console.log("Congratulations! Your item has been purchased!");
                                console.log("Your total for this transaction comes out to $" + (answer.amount * userpick.Price).toFixed(2));
                                displayStore();
                                connection.end();    
                            });
                        } else {
                            console.log("I am sorry, we do not have enough of this item in stock to make this transaction. Please try again.");
                            connection.end();
                            
                        }
                    })
                }
            }
        })
    })
}
