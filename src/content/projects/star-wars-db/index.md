---
title: Star wars DB
date: 2023-11-18
tags: [TypeScript, React, Next, Redux Toolkit]
urlRepo: https://github.com/Wystov/star-wars-db
urlDemo: https://rss-react-w4.netlify.app/
coverImg: './cover.png'
---

## Overview

This repository contains a web application for browsing Star Wars characters.
It was built while studying React.
The different branches of this repository show the path of learning new technologies and refactoring the application using them.

1. App was built on React classes. It allows to browse Star Wars characters via requests to API.  
   [code](https://github.com/Wystov/rss-react/tree/react/classes-w1) | [deploy](https://rss-react-w1.netlify.app/)
2. App was refactored to use function components and hooks. Added React Router for showing additional info of characters. Implemented pagination for search results with custom logic for setting results amount per page (api doesn't support this feature)  
   [code](https://github.com/Wystov/rss-react/tree/react/functions-routing-w2) | [deploy](https://rss-react-w2.netlify.app/)
3. Refactored app to use context API. Used Vitest and React testing library for writing unit tests with coverage > 80%  
   [code](https://github.com/Wystov/rss-react/tree/react/tests-context-w3) | [deploy](https://rss-react-w3.netlify.app/)
4. Used Redux and Redux toolkit for state managment and caching data from previous requests via RTK query.  
   [code](https://github.com/Wystov/rss-react/tree/react/redux-toolkit-w4) | [deploy](https://rss-react-w4.netlify.app/)
5. Migrated to Next.js and SSR.  
   [code](https://github.com/Wystov/rss-react/tree/react/next-w5) | [deploy](https://rss-react-zeta.vercel.app/)
6. Separate website containing forms with controlled and uncontrolled components and different validation strategies.  
   [code](https://github.com/Wystov/rss-react/tree/react/forms-w6) | [deploy](https://rss-react-forms-w6.netlify.app/)
