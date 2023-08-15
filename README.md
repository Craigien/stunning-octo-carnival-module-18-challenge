# stunning-octo-carnival-module-18-challenge
Module 18 Challenge

## Description

This web application allows the user to view and manipulate a database for an e-commerce platform.  Data can be viewed and modified using Insomnia and HTML routes.  The data revolves around the categories, products, and tags for the items on sale.

This web application allows the user to view and manipulate a MongoDB database used for a social media platform.  CRUD operations can be run on users and thoughts.  Users can have friends associated with them.  Thoughts can have reactions associated with them.

## Installation

This application will require Node.js to use.  It will also require running "npm install" to pull in the express and mongoose libraries into your environment.

## Usage

Use Insomnia to send fetch calls to various routes depending on what you wish to accomplish.  To view all users or thoughts use a GET route with http://localhost:3001/api/option_name where option name is users or thoughts.  Additionally, you can enter an ID number to view one item from either of those options by using the following GET route: http://localhost:3001/api/option_name/ID_number.

You can also use POST, PUT, and DELETE routes to modify data from the database.

To add a new item use POST route http://localhost:3001/api/option_name and pass in JSON.
To update existing item use PUT route http://localhost:3001/option_name/ID_number and pass in JSON.
To delete existing item use DELETE route http://localhost:3001/option_name/ID_number.

To add or delete friends to or from a user, use either a POST or DELETE route with http://localhost:3001/api/users/userId/friends/friendId.  UserId will be the user who you wish to add the friend to and friendId will be the userId of the user who will be added as a friend.

To add or delete reactions from a thought, user either a POST or DELETE route with http://localhost:3001/api/thoughts/thoughtId/reactions and pass in JSON.  ThoughtId will be the thought that you wish to add the reaction to.

Social Media Video Demonstration: 

## Credits

N/A

## License

N/A