
CREATE DATABASE Bamazon; 

USE Bamazon; 

CREATE TABLE Products(
	ItemID int NOT NULL AUTO_INCREMENT,
	ProductName VARCHAR(60),
	DepartmentName VARCHAR(60),
	Price DECIMAL(5,2),
	StockQuantity int,
	PRIMARY KEY(ItemID) 
);

INSERT INTO Products(ItemID, ProductName, DepartmentName, StockQuantity, Price)
VALUES
	(1, "XBOX", "Electronics", 50, 99.99),
	(2, "Playstation", "Electronics", 63, 119.99),
	(3, "Game Cube", "Electronics", 24, 79.99),
	(4, "Gameboy", "Electronics", 58, 39.99),
	(5, "TV", "Electronics", 25, 399.99),
	(6, "Controler", "Electronics", 80, 19.99),
	(7, "Speaker", "Electronics", 40, 15.99);