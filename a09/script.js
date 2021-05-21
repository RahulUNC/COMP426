$(function(){
    loadAllTweets();
    document.getElementById("post-tweet").onclick = handleTweetPost;
})

 function renderMyTweets1(tweet) {
    return `<div class="card" id="${tweet.id}">
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-4">${tweet.author}</p>
                            <p class="subtitle is-6">@${tweet.author}</p>
                        </div>
                    </div>
                    <div class="content">
                        ${tweet.body}
                        <br>
                        <time>${createTimeStamp(tweet.createdAt)}</time>
                    </div>
                </div>
                <footer tweet="${tweet.id}" class="card-footer">
                    <a tweet="${tweet.id}" class="card-footer-item has-text-danger"><span><i tweet="${tweet.id}"class="far fa-heart"></i></span><span tweet="${tweet.id}">${tweet.likeCount}</span></a>
                    <a tweet="${tweet.id}" class="card-footer-item has-text-success	"><span><i class="fas fa-retweet"></i></span><span tweet="${tweet.id}">${tweet.retweetCount}</span></a>
                    <a tweet="${tweet.id}" class="card-footer-item reply-tweet"><span tweet="${tweet.id}"><i tweet="${tweet.id}" class="fas fa-reply"></i><span> ${tweet.replyCount}</a>         
                    <a tweet="${tweet.id}" class="card-footer-item edit-tweet"><i class="fas fa-edit"></i></a>         
                    <a tweet="${tweet.id}" class="card-footer-item delete-tweet has-text-danger"><i class="fas fa-trash"></i></a>         
                </footer>
            </div>`
}

async function getTweet(tweetId) {
    return await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + tweetId,
        withCredentials: true
    })
}

async function renderMyTweets(tweet) {
    let returnHTML = `
        <div id="mycard-${tweet.id}">
            <div class="card" id="${tweet.id}">
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-4">${tweet.author}</p>
                            <p class="subtitle is-6">@${tweet.author}</p>
                        </div>
                    </div>
                    <div class="content">
                        ${tweet.body}
                        <br>
                        <time>${createTimeStamp(tweet.createdAt)}</time>
                    </div>
                </div>
                <footer tweet="${tweet.id}" class="card-footer">
                    <a ` + generateLikeNames(tweet) + `tweet="${tweet.id}" class="card-footer-item has-text-danger"><span><i tweet="${tweet.id}"class="far fa-heart"></i></span><span tweet="${tweet.id}">${tweet.likeCount}</span></a>
                    <a tweet="${tweet.id}" class="card-footer-item has-text-success	"><span><i class="fas fa-retweet"></i></span><span tweet="${tweet.id}">${tweet.retweetCount}</span></a>
                    <a tweet="${tweet.id}" class="card-footer-item reply-tweet"><span tweet="${tweet.id}"><i tweet="${tweet.id}" class="fas fa-reply"></i><span> ${tweet.replyCount}</a>         
                    <a tweet="${tweet.id}" class="card-footer-item edit-tweet"><i class="fas fa-edit"></i></a>         
                    <a tweet="${tweet.id}" class="card-footer-item delete-tweet has-text-danger"><i class="fas fa-trash"></i></a>         
                </footer>
            </div>
        </div>
        <br>`
    return returnHTML;  
}

function createTimeStamp(timestamp) {
    let date = new Date(timestamp);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[date.getMonth()] + " " + date.getDate() + ', ' + date.getFullYear() + " @ " + date.getHours() + ":" + date.getMinutes();
}

async function submitDelete(event) {
    let tweetId = event.currentTarget.getAttribute("tweet");
    document.getElementById("mycard-"+tweetId).innerHTML = "";
    const result = await axios({
        method: 'delete',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + tweetId,
        withCredentials: true,
    }).then(result => {
        loadAllTweets()
    })
}

async function submitEdit(event) {
    let tweetId = event.currentTarget.getAttribute("tweet");
    let tweet = "";
    let textMessage = document.getElementById("editmesseage-"+tweetId).value
    let result = await getTweet(tweetId).then(editTweet => {
        tweet = editTweet['data'];
    })
    const postEdit = await axios({
        method: 'put',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + tweetId,
        withCredentials: true,
        data: {
            body: textMessage
        },
    }).then(postResult => {
        tweet["body"] = textMessage
        document.getElementById("mycard-"+tweetId).innerHTML = renderMyTweets1(tweet);
        loadAllTweets();
    })
}

async function cancelEdit(event){
    let tweetId = event.currentTarget.getAttribute("tweet");
    const result = getTweet(tweetId).then(editTweet => {
        document.getElementById("mycard-"+tweetId).innerHTML = renderMyTweets1(editTweet["data"]);
    })
}


function renderEditTweet(event) {
    let tweetId = event.currentTarget.getAttribute("tweet");
    document.getElementById("mycard-"+tweetId).innerHTML = renderEditForm(tweetId);
}

function renderEditForm(tweetId) {
    return `<div class="card" id="${tweetId}">
                <div class="card-content">
                    <div class="field">
                        <label class="label">Edit</label>
                        <br>
                        <div class="control">
                            <textarea id = "editmesseage-${tweetId}" class="textarea" placeholder="Edit your tweet!"></textarea>
                        </div>
                    </div>
                    <div class="field is-grouped">
                        <div class="control">
                            <button tweet = "${tweetId}" class="button is-link edit-submit">Submit</button>
                        </div>
                        <div class="control">
                            <button tweet ="${tweetId}" class="button is-link is-light edit-cancel">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <br>`
}

function renderDeleteTweet(event) {
    let tweetId = event.currentTarget.getAttribute("tweet");
    document.getElementById("mycard-"+tweetId).innerHTML = `<div class="card" id="${tweetId}">
                <div class="card-content">
                    <div class="field">
                        <label class="label">Are you sure you want to delete this tweet?</label>
                    </div>
                    <div class="field is-grouped">
                        <div class="control">
                            <button tweet = "${tweetId}" class="button is-link delete-submit">Yes</button>
                        </div>
                        <div class="control">
                            <button tweet ="${tweetId}" class="button is-link is-light edit-cancel">No</button>
                        </div>
                    </div>
                </div>
            </div>
            <br>`
}

async function loadAllTweets() {
    const $feed = $('#feed');
    let tweets = [];
    const result = await axios({
        method: 'GET',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        type: 'tweet',
        withCredentials: true,
    }).then(success => {
        tweets = success['data'];      
        tweets.forEach(tweet => {
            if(tweet['isMine']) {
                renderMyTweets(tweet).then(htmlObject => {$feed.append(htmlObject)})
            } else {
                renderTweet(tweet).then(htmlObject => {$feed.append(htmlObject)})
            }
        });        
        $feed.on('click', '.like-tweet', handleTweetLike);
        $feed.on('click', '.retweet-click', handleRetweetLike);
        $feed.on('click', '.retweet-form', handleRetweetPost);
        $feed.on('click', '.retweet-cancel', handleRetweetCancel);
        $feed.on('click', '.reply-tweet', handleReplyTweet);
        $feed.on('click', '.reply-cancel', handleReplyCancel);
        $feed.on('click', '.reply-submit', handleReplySubmit);
        $feed.on('click', '.edit-tweet', renderEditTweet);
        $feed.on('click', '.delete-tweet', renderDeleteTweet);        
        $feed.on('click', '.edit-cancel', cancelEdit);              
        $feed.on('click', '.edit-submit', submitEdit);     
        $feed.on('click', '.delete-submit', submitDelete);    
        $feed.on('click', '.reply-delete', handleReplyDelete)
        $feed.on('click', '.reply-edit', handleReplyEdit)
        $feed.on('click', '.reply-edit-cancel', handleReplyEditCancel)
        $feed.on('click', '.reply-edit-submit', handleReplyEditSubmit)
    })
}

async function handleReplyEditSubmit(event) {
    let tweetId = event.currentTarget.getAttribute('tweet');
    let updateTweet = await axios({
        method: 'put',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + tweetId,
        withCredentials: true,
        data: {
            body: document.getElementById('replyeditmessage-'+tweetId).value
        }
    }).then(result => {
        document.getElementById('myreply-'+tweetId).innerHTML = `<div class="card-content">
            <p>` + result.data.author + ` replied: ` + result.data.body + `</p><br>
            <button tweet = ${result.data.id} class="button is-small reply-edit">Edit</button>
            <button tweet = ${result.data.id} class="button is-small reply-delete">Delete</button>
        </div>`
    })
}

async function handleReplyEditCancel(event) {
    let tweetId = event.currentTarget.getAttribute('tweet');
    let tweet = await getTweet(tweetId).then(result => {
        document.getElementById('myreply-'+tweetId).innerHTML = `<div class="card-content">
            <p>` + result.data.author + ` replied: ` + result.data.body + `</p><br>
            <button tweet = ${result.data.id} class="button is-small reply-edit">Edit</button>
            <button tweet = ${result.data.id} class="button is-small reply-delete">Delete</button>
        </div>`
    })
}

async function handleReplyEdit(event) {
    let tweetId = event.currentTarget.getAttribute('tweet');
    document.getElementById('myreply-'+tweetId).innerHTML =  `<div class="card-content">
                <div class="control">
                    <textarea maxlength="280" maxlength="280" id = "replyeditmessage-${tweetId}" class="textarea" placeholder="Edit your reply!"></textarea>
                </div>
                <br>
                <div class="field is-grouped">
                    <div class="control">
                        <button tweet = "${tweetId}" class="button is-link reply-edit-submit">Submit</button>
                    </div>
                    <div class="control">
                        <button tweet ="${tweetId}" class="button is-link is-light reply-edit-cancel">Cancel</button>
                    </div>
                </div>
            </div>`
}

async function handleReplyDelete(event) {
    let tweetId = event.currentTarget.getAttribute('tweet');
    const deleteReply = await axios({
        method: 'delete',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + tweetId,
        withCredentials: true,
    }).then(result => {
        document.getElementById('myreply-'+tweetId).remove();
    })
}

async function handleReplySubmit(event) {
    let tweetId = event.currentTarget.getAttribute('tweet');
    let textMessage = document.getElementById("replymessage-"+tweetId).value;
    const postReply = await axios({
        method: 'post',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
            type: "reply",
            parent: tweetId,
            body: textMessage
        }
    }).then(result => {
    })
    const repliedTweet = getTweet(tweetId).then(tweetResult => {
        let tweet = tweetResult['data']
        document.getElementById("replymessage-"+tweetId).value = '';
        document.getElementById('replyholder-'+tweetId).innerHTML = genReplyLines(tweet.replies);
    })
}

async function handleReplyCancel(event) {
    let tweetId = event.currentTarget.getAttribute("tweet");
    const result = getTweet(tweetId).then(tweetResult => {
        if(tweetResult.data['isMine']) {
            document.getElementById('mycard-'+tweetId).innerHTML = renderMyTweets1(tweetResult['data'])
        } else {
            document.getElementById('card-'+tweetId).innerHTML = renderTweet1(tweetResult['data'])
        }
    })
}

async function handleReplyTweet(event) {
    let tweetId = event.currentTarget.getAttribute("tweet");
    let tweet = null;
    const result = getTweet(tweetId).then(tweetResult => {
        tweet = tweetResult['data']
        if(tweet['isMine']) {
            document.getElementById('mycard-'+tweetId).innerHTML = renderReplyForm(tweet)
        } else {
            document.getElementById('card-'+tweetId).innerHTML = renderReplyForm(tweet)
        }
    })
}

function renderReplyForm(tweet) {
    return `<div class="card" id="${tweet.id}">
    <div class="card-content">
        <div class="field">
            <label class="label">Reply</label>
            <p>${tweet.author} tweeted: ${tweet.body}</p> 
            <div id="replyholder-${tweet.id}">` +
            genReplyLines(tweet.replies)
            + `</div>
            <div class="control">
                <textarea maxlength="280" maxlength="280" id = "replymessage-${tweet.id}" class="textarea" placeholder="Reply to ${tweet.author}!"></textarea>
            </div>
        </div>
        <div class="field is-grouped">
            <div class="control">
                <button tweet = "${tweet.id}" class="button is-link reply-submit">Submit</button>
            </div>
            <div class="control">
                <button tweet ="${tweet.id}" class="button is-link is-light reply-cancel">Cancel</button>
            </div>
        </div>
    </div>
</div>
<br>`
}

function genReplyLines(replies) {   
    let returnString = ``;
    if(replies != undefined) {
        returnString += `<br>`;
        for(let i = 0; i < replies.length; i++) {
            if(replies[i].isMine) {
                returnString += 
                `<div id="myreply-${replies[i].id}" class="card">
                    <div class="card-content">
                        <p>` + replies[i].author + ` replied: ` + replies[i].body + `</p><br>
                        <button tweet = ${replies[i].id} class="button is-small reply-edit">Edit</button>
                        <button tweet = ${replies[i].id} class="button is-small reply-delete">Delete</button>
                    </div>
                </div>
                <br>`
            } else {
                returnString += 
                `<div id="reply-${replies[i].id}" class="card">
                    <div class="card-content">
                        <p>` + replies[i].author + ` replied: ` + replies[i].body + `</p>
                    </div>
                </div>
                <br>`
            }
        }
    }
    return returnString;
}

async function handleRetweetCancel(event){
    let tweetId = event.currentTarget.getAttribute("tweet");
    let tweet = null;
    const result = getTweet(tweetId).then(tweetResult => {
        tweet = tweetResult['data']
        document.getElementById('card-' + tweet.id).innerHTML = renderTweet1(tweet);
    })
}

async function handleRetweetPost(event) {
    let tweetId = event.currentTarget.getAttribute("tweet");
    let textToPost = document.getElementById("remesseage-"+tweetId).value;
    let tweet = null;
    const result = await getTweet(tweetId).then(tweetResult => {
        tweet = tweetResult['data']
    })
    let postedTweet = '';
    const post = await axios({
        method: 'POST',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
            type: 'retweet',
            body: textToPost + " ~ retweeting '" + tweet['body'] + "' from " + tweet['author'],
            parent: tweetId
        }
    }).then(result => {
        tweet["retweetCount"] = tweet["retweetCount"] + 1;
        postedTweet = result['data'];
        document.getElementById("card-" + tweetId).innerHTML =  renderTweet1(tweet);
        const $feed = $('#feed');
        $feed.prepend(`<div id="mycard-${postedTweet.id}">` + renderMyTweets1(postedTweet) + `</div><br>`);
    })
}

async function renderTweet(tweet) {
    let returnHTML = `
        <div id="card-${tweet.id}">
            <div class="card" id="${tweet.id}">
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-4">${tweet.author}</p>
                            <p class="subtitle is-6">@${tweet.author}</p>
                        </div>
                    </div>
                    <div class="content">
                        ${tweet.body}
                        <br>
                        <time>${createTimeStamp(tweet.createdAt)}</time>
                    </div>
                </div>
                <footer tweet ="${tweet.id}" class="card-footer">`
                returnHTML += generateLikeHTML(tweet)
                    returnHTML += `
                    <a id = "retweet-${tweet.id}" tweet ="${tweet.id}" class="card-footer-item retweet-click has-text-success">
                        <span><i tweet="${tweet.id}" class="fas fa-retweet"></i></span> 
                        <span tweet="${tweet.id}">${tweet.retweetCount}</span>
                    </a>
                    <a tweet="${tweet.id}" class="card-footer-item reply-tweet"><span tweet="${tweet.id}"><i tweet="${tweet.id}" class="fas fa-reply"></i><span> ${tweet.replyCount}</a>         
                </footer>
            </div>
        </div>
        <br>`
    return returnHTML;
}

function renderTweet1(tweet) {
    let returnHTML = `
            <div class="card" id="${tweet.id}">
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-4">${tweet.author}</p>
                            <p class="subtitle is-6">@${tweet.author}</p>
                        </div>
                    </div>
                    <div class="content">
                        ${tweet.body}
                        <br>
                        <time>${createTimeStamp(tweet.createdAt)}</time>
                    </div>
                </div>
                <footer tweet ="${tweet.id}" class="card-footer">`
                returnHTML += generateLikeHTML(tweet)
                    returnHTML += `
                    <a id = "retweet-${tweet.id}" tweet ="${tweet.id}" class="card-footer-item retweet-click has-text-success	">
                        <span><i tweet="${tweet.id}" class="fas fa-retweet"></i></span> 
                        <span tweet="${tweet.id}">${tweet.retweetCount}</span>
                    </a>
                    <a tweet="${tweet.id}" class="card-footer-item reply-tweet"><span><i tweet="${tweet.id}" class="fas fa-reply"></i><span> ${tweet.replyCount}</a>         
                </footer>
            </div>
            <br>`
    return returnHTML;
}

function generateLikeHTML(tweet) {
    if(tweet['isMine']) {
        return `<a ` + generateLikeNames(tweet) + ` id = "like-${tweet.id}" tweet = "${tweet.id}" class="card-footer-item has-text-danger"><span><i tweet="${tweet.id}"class="far fa-heart"></i></span><span tweet="${tweet.id}">${tweet.likeCount}</span></a>` 
    }
    if(tweet['isLiked']) {
        return `<a  ` + generateLikeNames(tweet) + ` id = "like-${tweet.id}" tweet = "${tweet.id}" class="card-footer-item like-tweet has-text-danger"><span><i tweet="${tweet.id}" class="fas fa-heart"></i></span><span tweet="${tweet.id}">${tweet.likeCount}</span></a>`
    } else {
        return `<a ` + generateLikeNames(tweet) + ` id = "like-${tweet.id}" tweet = "${tweet.id}" class="card-footer-item like-tweet has-text-danger"><span><i tweet="${tweet.id}"class="far fa-heart"></i></span><span tweet="${tweet.id}">${tweet.likeCount}</span></a>`
    }
}

function generateLikeNames(tweet) {
    if(tweet.likeCount === 0) {
        return '';
    } else {
        let returnString = `data-tooltip="`;
        let likeArray = tweet['someLikes']
        likeArray.forEach(name => {
            returnString += (`@` + name + ` `)
        })
        returnString += `"`
        return returnString;
    }
}

async function handleTweetPost(event) {
    let textToPost = document.getElementById("tweet-text").value;
    let postedTweet = '';
    const result = await axios({
        method: 'POST',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          body: textToPost
        }
    }).then(result => {
        postedTweet = result['data'];
        document.getElementById("tweet-text").value = "";
        const $feed = $('#feed');
        $feed.prepend(`<div id="mycard-${postedTweet.id}">` + renderMyTweets1(postedTweet) + `</div><br>`);
    })
}

async function handleTweetLike(event) {
    let tweet = "";
    let liked = false;
    let tweetId = event.currentTarget.getAttribute("tweet");
    const getTweet = await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + tweetId,
        withCredentials: true,
    }).then(result => {
        tweet =  result.data;
        if(tweet['isLiked']) {
            liked=true;
        } else {
            liked = false;
        }
    })
    if(liked) {
        const unlike = await axios({
            method: 'put',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + tweetId + '/unlike',
            withCredentials: true,
        }).then(result => {
        })
    } else {
        const like = await axios({
            method: 'put',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + tweetId + '/like',
            withCredentials: true,
        }).then(result => {
        })
    }
    const getfinaltweet = await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + tweetId,
        withCredentials: true,
    }).then(newlikeresult => {
        document.getElementById('card-'+ tweetId).innerHTML = renderTweet1(newlikeresult['data']);
    })
}

async function handleRetweetLike(event) {
    let tweet = null;
    let tweetId = event.currentTarget.getAttribute("tweet");
    const getTweet = await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + tweetId,
        withCredentials: true,
    }).then(result => {
        tweet = result['data'];
    })
    document.getElementById("card-"+tweetId).innerHTML = renderRetweetForm(tweet);
}

function renderRetweetForm(tweet) {
    return `<div class="card" id="${tweet.id}">
                <div class="card-content">
                    <div class="field">
                        <label class="label">Retweet</label>
                        <p class="is-italic">${tweet["body"]}</p>
                        <br>
                        <div class="control">
                            <textarea maxlength="280" id = "remesseage-${tweet.id}" class="textarea" placeholder="Retweeting tweet from ${tweet.author}"></textarea>
                        </div>
                    </div>
                    <div class="field is-grouped">
                        <div class="control">
                            <button tweet = "${tweet.id}" class="button is-link retweet-form">Submit</button>
                        </div>
                        <div class="control">
                            <button tweet ="${tweet.id}" class="button is-link is-light retweet-cancel">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <br>`
}