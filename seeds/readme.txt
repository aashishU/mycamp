#### SEEDS ####

- By running "node index.js" in terminal, we delete everything in our database and populating it with new data.

- This is to fill our database with random data that we can use for our YelpCamp app.
- cities.js file contains information of 1000 cities.
- seedHelpers.js file contains list of random Names and list of Places.
- We create title: by combining a Name and a Place chosen randomly.
- We are taking a city randomly from cities.js
- By combining Title and City we create one camp site.
- Now we are repeating above process 50 times to generate 50 camp sites.
- These 50 camp sites will be saved in the mongo database.
- Thats how we Populate our Database to use it for our App.