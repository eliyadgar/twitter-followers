export const getFollowers = async (accountName, count = 30) => {
    let cursor = -1
    let completeFollowersList = []
    const response = await fetch(`/api/followers?screen_name=${accountName}&count=${count}&cursor=${cursor}`)
    
    try {
         do {
            const response = await fetch(`/api/followers?screen_name=${accountName}&count=${count}&cursor=${cursor}`)
            const resJson = await response.json()
            cursor = resJson.next_cursor
            const followers = resJson.users.map(user => {
                return {id: user.id,
                    account_name: user.name,
                    screen_name: user.screen_name,
                    followers: user.followers_count,
                    image: user.profile_image_url
                }
            })
            completeFollowersList.push(...followers)

        } while (cursor !== 0 && count > 30)
    }catch(e) {
        console.log(e)  
    }
    return completeFollowersList;
}


export const getAccount = async (accountName) => {
    try {
    return fetch(`/api/account/${accountName}`)
    .then(response => response.json())
            .then(result => {
                const account = {screen_name: result.screen_name, 
                    followers_count: result.followers_count}
                return account
            })
            .catch(error => console.log('error', error));
    } catch(e) {
        console.log(e)  
    }
}