# MaVe Adventures

Welcome to MaVe Adventures, the last project during my Bootcamp studies at Ironhack. This interactive platform is designed for travel enthusiasts to share their adventures, add their favorite journeys, and discover new destinations!

**Technologies used**
HTML, CSS, React.js, Bootstrap, Node.js, MongoDB, Express, Mongoose

# Auth Routes

Base URL /auth

| HTTP Method | URI path       | Action                               |
|-------------|----------------|--------------------------------------|
| POST        | /signup        | Sign up                              |
| POST        | /login         | Log In                               |
| GET         | /verify        | Verify Auth token                    |

# User Routes

Base URL /user

| HTTP Method | URI path                  | Action                               |
|-------------|---------------------------|--------------------------------------|
| PUT         | /add-fav-travel/:travelId | Add favorite travels to user profile |
| DELETE      | /:username                | Delete user                          |

# Travel Routes

Base URL /travel

| HTTP Method | URI path                   | Action                                   |
|-------------|----------------------------|------------------------------------------|
| POST        | /:travelId                 | Create new review for a specific travel  |
| POST        | /                          | Create new travel                        |
| GET         | /All                       | Read all travels                         |
| GET         | /continent/:continentName  | Read travels only in a specific continent|
| GET         | /details/:travelId         | Read reviews of a specific travel        |
| GET         | /search                    | Search a specific country                |
| GET         | /:travelId                 | Read details of a specific travel        |
| GET         | /:travelId/reviews         | Read reviews of a specific travel        |

# Review Routes

Base URL /reviews

| HTTP Method | URI path                   | Action                                   |
|-------------|----------------------------|------------------------------------------|
| POST        | /:travelId                 | Create new review for a specific travel  |
| GET         | /                          | Read all reviews                         |
| DELETE      | //:reviewId                | Delete a specific review                 |


# Deploy
Check it [here](https://mavetravels.netlify.app/).
