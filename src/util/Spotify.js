const clientId = 'ec2a60e2492b44daa0aa4e3ec40996a0';
const redirectUri = 'http://localhost:8888/callback';
let AccessToken;

let Spotify = {
    getAccessToken() {
        if (AccessToken) {
            return AccessToken;
        }

        const AccessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        //Set the access token value
        // Set a variable for expiration time
        // Set the access token to expire at the value for expiration time

        if (AccessTokenMatch && expiresInMatch) {
            AccessToken = AccessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            //Clear the parameters from the URL, so the app doesn’t try grabbing the access token after it has expired
            window.setTimeout(() => AccessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return AccessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    search(term){
        const AccessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${AccessToken}`
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    return [];
                }
                //Convert the returned response to JSON.
                // If the JSON does not contain any tracks, return an empty array.
                return jsonResponse.tracks.items.map(track => ({
                    ID: track.id,
                    Name: track.name,
                    Artist: track.artists[0].name,
                    Album: track.album.name,
                    URI: track.uri
                }));
            });
    },

    savePlaylist(name, trackURIs) {
        if (!name || !trackURIs.length) {
          return;
        }
    
        const AccessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${AccessToken}`};
        let userId;
        //Use the returned user ID to make a POST request that creates a new playlist in the user’s account and returns a playlist ID.
        return fetch('https://api.spotify.com/v1/me', {
          headers: headers
        }).then(response => {
          return response.json()
        }).then(jsonResponse => {
          userId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name: name}),
          }).then(response => {
            return response.json()
          }).then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({uris: trackURIs}),
            })
          })
        })
      },
    }    
          
export default Spotify;