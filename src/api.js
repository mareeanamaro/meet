import { mockData } from "./mock-data";
import axios from 'axios';
import nprogress from "nprogress";

export const extractLocations = (events) => {
    let extractLocations = events.map((event) => event.location);
    let locations = [...new Set(extractLocations)];
    return locations;
};

const getToken = async (code) => {
    const encodeCode = encodeURIComponent(code);
    const { access_token } = await fetch(
        'https://n7s29x0hj3.execute-api.eu-west-2.amazonaws.com/dev/api/token' + '/' + encodeCode
    )
    .then((res) => {
        return res.json();
    })
    .catch((error) => error);

    localStorage.setItem("access_token", access_token);

    return access_token;
}

export const checkToken = async(accessToken) => {
    const result = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`)
        .then((res) => res.json())
        .catch((error) => error.json());
    return result;
}

export const getEvents = async () => {
    nprogress.start();

   if (window.location.href.startsWith('http://localhost')) {
    nprogress.done();    
    return mockData
    }

    if (!navigator.onLine) {
        const data = localStorage.getItem('lastEvents')
        nprogress.done()
        return data ? JSON.parse(data).events : []
      }    

    const token = await getAccessToken();

    if(navigator.onLine) {
        if(token) {
            removeQuery();
            const url = 'https://n7s29x0hj3.execute-api.eu-west-2.amazonaws.com/dev/api/get-events' + '/' + token;
            const result = await axios.get(url);
            if (result.data) {
                var locations = extractLocations(result.data.events);
                localStorage.setItem('lastEvents', JSON.stringify(result.data));
                localStorage.setItem('locations', JSON.stringify(locations));
            }
            nprogress.done();
            return result.data.events;
        }
    }
};

const removeQuery = () => {
    if (window.history.pushState && window.location.pathname) {
        var newurl =
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname;
        window.history.pushState('', '', newurl);
    } else {
        newurl =  window.location.protocol +
        '//' +
        window.location.host 
        window.history.pushState('', '', newurl);
    }
}

export const getAccessToken = async () => {
    //first check local storage for an access token
    const accessToken = localStorage.getItem('access_token');

    const tokenCheck = accessToken && (await checkToken(accessToken));
    // if there is no valid token, it checks for a code
    if (!accessToken || tokenCheck.error) {
        // await localStorage.removeItem('access_token');
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get('code');
        //if there is no code, it redirects the user to the auth screen to get a code
        if (!code) {
            const results = await axios.get('https://n7s29x0hj3.execute-api.eu-west-2.amazonaws.com/dev/api/get-auth-url');
            const { authUrl } = results.data;
            return (window.location.href = authUrl);
        }
        //if there is a code if exchanges the code for a token
        return code && getToken(code);
    }
    //when there is a token it returns it
    return accessToken
};