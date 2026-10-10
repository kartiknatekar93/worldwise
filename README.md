# WorldWise

A travel-tracking app. Click anywhere on a map to log a city you've visited, add notes and a date, and see all your cities and countries in one place.

**Live demo:** https://myworldwisetracking.netlify.app/ 
**Repo:** https://github.com/kartiknatekar93/worldwise



## Features

- Interactive map (click to select a position, markers for saved cities)
- Add a city with name, visit date, and notes (name auto-filled by reverse geocoding)
- City list and country list views
- View and delete saved cities
- Selected city and map position stored in the URL (shareable, survives refresh)
- Fake authentication with protected routes
- Route-based code splitting with loading fallbacks

## Tech stack

| Area | Tools |
|---|---|
| UI | React, Vite |
| Routing | React Router |
| State | Context API + `useReducer` |
| Map | Leaflet / react-leaflet |
| Styling | CSS Modules |
| Data | json-server (fake REST API) |

## How it works

- **State:** a `CitiesContext` holds cities, the current city, loading, and error state. A reducer handles all transitions (`cities/loaded`, `city/created`, `city/deleted`, `rejected`) so related updates stay together.
- **URL as source of truth:** the map click navigates to `form?lat=..&lng=..`. A custom `useUrlPosition` hook reads these values, so the map and form stay in sync, links are shareable, and refresh and Back work.
- **Fetching:** data loads in effects with cleanup to avoid stale responses; functions in dependency arrays are wrapped in `useCallback` to prevent re-fetch loops.
- **Code splitting:** pages are loaded with `React.lazy` and `Suspense`.

## Design decisions and trade-offs

- **Context + reducer instead of Redux/React Query:** the state is small and shared by a few components. Cost: every consumer re-renders on any change and there is no built-in caching. For a larger app I would move server data to React Query.
- **Position in the URL instead of global state:** shareable and refresh-safe, but values arrive as strings and must be parsed and validated.
- **SPA instead of Next.js:** the app is behind a login, so SEO is not a concern. Cost: slower first load.
- **json-server:** fast to build, but no real auth, validation, or persistence once deployed.
- **Fake auth:** demonstrates protected routes only. It is not secure.

## Getting started

```bash
git clone <repo-url>
cd worldwise
npm install

# start the fake API (port 9000)
npm run server

# start the app
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run server` | Start json-server on `data/cities.json` |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |

## Possible improvements

- Move server data to React Query (caching, retries)
- Real backend with proper authentication
- Tests for the reducer and `useUrlPosition`
- Accessibility pass on the map controls
- Error boundaries and better empty states

## Credits

Built while following a React course, then extended with: <list what you changed or added>.
