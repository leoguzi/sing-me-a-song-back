# SingMeASong

## About

This is a music recommendation API. Some of the features are:

- Register a new recommendation;
- Give an up or down vote to a recommendation;
- Get a random recommendation.

## Technologies

The following tools were used in the construction of the project:<br>

<p>
<img style='margin: 5px;' src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
<img style='margin: 5px;' src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
<img style='margin: 5px;' src='https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white'>
<img style='margin: 5px;' src='https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white'>
<img style='margin: 5px;' src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
<img style='margin: 5px;' src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E"/>
<img style='margin: 5px;' src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white
"/>

</p>

## How to run

1. Clone this repository

```bash
git clone https://github.com/leoguzi/sing-me-a-song-back.git
```

2. Install dependencies:

```bash
npm i
```

3. Create the database using the provided dump.sql file.

4. Configure the enviroment variables using the .env.example file.

5. Run the back-end on development mode with:

```bash
npm run dev
```

6. The API is up and ready to receive requests at port you configured at the .env file

7. You can alternatively access this API directly on https://singmeasongleo.herokuapp.com/

## Another information

- The production environment (npm start) is configured for the heroku deployment. If you wish to run in production locally you must edit the database.js file to point to a valid .env with the following the .env.exemple.

- You can run the tests with:

```bash
npm run test
```

or

```bash
npm run test-watch
```

## Routes Guide

## Register a new recommendation:

### POST requisiton to the /recommendations route with the folowing body:

```json
{
  "name": "Falamansa - Xote dos Milagres",
  "youtubeLink": "https://www.youtube.com/watch?v=chwyjJbcs1Y"
}
```

- The music name must have more than three caracteres;
- The youtube link must be a valid YouTube URL.
- The score will start with 0 votes.

## Up vote a recommendation:

### POST requisition to the /recommendations/:id/upvote route with no body.

- The id must be integer and must be of an existing recommendation.

## Down vote a recommendation:

### POST requisition to the /recommendations/:id/downvote route with no body.

- The id must be integer and must be of an existing recommendation.
- If the recommendation score goes under -5, the recommendation will be removed from the list.

## Get a random recommendation:

### GET requisition to the /recommendations/random route with no body.

- 70% of the times this route is hit, it will return a recommendation with a score greater than 10;
- The other 30% it will return a recommendation with a score within -5 and 10;
- If there are no recommendations with a score greater than 10 it will return a random recommendation, no matter the score;
- If there are no recommendations with a score lesser than 10 it will return a random recommendation, no matter the score;
- The response will be an object similar to the following example:

```json
{
  "id": 150,
  "name": "Chitãozinho E Xororó - Evidências",
  "youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
  "score": 245
}
```

## Get top x recommendations:

### Get requisition to the /recommendations/top/:amount route with no body.

- It will return a list with the top x (amout) recommendations, ordered by the greater score like the following example:

```json
[
  {
    "id": 150,
    "name": "Chitãozinho E Xororó - Evidências",
    "youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
    "score": 245
  },
  {
    "id": 12,
    "name": "Falamansa - Xote dos Milagres",
    "youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
    "score": 112
  }
]
```
