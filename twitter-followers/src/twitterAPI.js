export const getFollowers = async (accountName) => {
    try {
    return fetch(`/api/followers/${accountName}`)
    .then(response => response.json())
            .then(result => {
                console.log(result);
                
                const followers = result.users.map(user => {
                    return {id: user.id,
                        label: user.name,
                        followers: user.followers_count,
                        image: user.profile_image_url
                    }
                })
                console.log(followers)
                return followers
            })
            .catch(error => console.log('error', error));
    } catch(e) {
        console.log(e)  
    }
}