---
title: Async Race
date: 2023-07-22
tags: [TypeScript, Personal]
urlRepo: https://github.com/Wystov/async-race
urlDemo: https://wystov.github.io/async-race/
coverImg: './cover.png'
brief: 'Async racing game'
---

```
Backend of this application is deployed on free server, so on cold start it may take a while.
Please wait until it loads cars before making any actions.
```

## Overview

Async Race is a game that allows managing a collection of cars, operating their engines, and displaying race statistics. This project allows users to perform CRUD operations on cars, start and stop engines, and conduct races to determine the fastest car.

## Features

- Fully asynchronous. All actions will send request to server, and react after response only.
- Two main views: "Garage" and "Winners".
- Persistent view state between switches.
- Create, edit and delete cars in garage.
- Generate 100 random cars at once.
- Color selection from an RGB palette.
- Pagination for garage and winners.
