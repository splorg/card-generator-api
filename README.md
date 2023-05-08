# card-generator-api

An API for generating cards based on the game Inscryption.

## Features:
- [x] Tribes, Temples, Skills and Cards CRUD
- [x] Schema validation through Mongoose
- [x] Filtering of cards by rarity, tribe, temple or skill

## Running the Project

If you just want to see the project in action, I recommend using Docker for a quicker setup:

```bash
# clone the project
git clone git@github.com:splorg/card-generator-api.git

# move to the project folder
cd card-generator-api

# run docker-compose
docker compose up -d
```

The API will now be available on http://localhost:3000/

If you want to run the project locally, you will need Node.js installed and a MongoDB database.

```bash
# clone the project
git clone git@github.com:splorg/card-generator-api.git

# move to the project folder
cd card-generator-api

# rename ".env.example" to ".env"

# add to .env your MongoDB connection string and the port you want to use

# install the project dependencies:
npm i

# start the project
npm run dev
```

### 
