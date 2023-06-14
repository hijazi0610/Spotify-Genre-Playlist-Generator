const APIController = (function() {

    const clientID = '4e0f3480e6584eff96c7f1b158eadbed';
    const clientSecret = 'cfbe5672fd8b4909b9f2433c26a184154e0f3480e6584eff96c7f1b158eadbed';

    const _getToken = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic' + btoa(clientID + ':' + clientSecret)
          },
          body: {
            'grant_type': "authorization_code"
          }
        });
        const data = await result.json();
        return data.access_token;
    }
    
    const _getGenres = async (token) => {
        const result = await fetch('https://api.spotify.com/v1/browse/categories', {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token}
        });

        const data = await result.json();
        return data.categories.items;
    }

    const _getPlaylistByGenre = async (token, genreId) => {

        const limit = 10;

        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token}
        });

        const data = await result.json();
        return data.playlists.items;
    }

    const _getTracks = async (token, tracksEndPoint) => {

        const limit = 10;

        const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token}
        });

        const data = result.json();
        return data.items;
    }

    const _getTrack = async (token, trackEndPoint) => {

        const limit = 10;

        const result = await fetch(`${trackEndPoint}`, {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token}
        });

        const data = await result.json();
        return data;
    }

    return {
        getToken() {
            return _getToken();
        },
        getGenres(token) {
            return _getGenres();
        },
        getPlaylistByGenre(token, genreId) {
            return _getPlaylistByGenre();
        },
        getTracks(token, tracksEndPoint) {
            return _getTracks;
        },
        getTrack(token, trackEndPoint) {
            return _getTrack;
        }
    }

})


const UIController = (function() {
    const DOMElements = {
        selectGenre: document.getElementById('#genre'),
        selectPlaylist: document.getElementById('#playlist'),
        selectButton: document.getElementById('#submit'),
        divSongDetail: document.getElementById('.song-details'),
        hfToken: '#hidden-token',
        divSongList: '.list-group-items'
    }
})