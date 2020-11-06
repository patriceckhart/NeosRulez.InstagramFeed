async function getInstagramPictures(profileName) {
    baseUrl = 'https://www.instagram.com';
    profileUrl = `${baseUrl}/${profileName}`;
    jsonDataUrl = `${profileUrl}/?__a=1`;
    response = await fetch(jsonDataUrl);
    jsonData = await response.json();
    pictures = jsonData.graphql.user.edge_owner_to_timeline_media.edges;
    if (response.ok) {
        return JSON.stringify(pictures);
    } else {
        throw new Error(pictures);
    }
}