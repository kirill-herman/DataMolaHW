;const myModule = (function() {
  
  let user = 'Kirill';

  const maxTextLength = 280;
  
  const getTweets = (skip = 0, top = 10, filterConfig = {}) => {
    const resultTweetsArr = [];

    let workingTweetsArr = tweets.slice(skip);
    
    if (Object.keys(filterConfig).length !== 0) {                               
      
      workingTweetsArr = workingTweetsArr.filter((tweet) => {
        if ('author' in filterConfig) {
          if (tweet.author !== filterConfig.author) return false; 
        } 
        if ('dateTo' in filterConfig) {
          if (tweet.createdAt > filterConfig.dateTo) return false; 
        }
        if ('dateFrom' in filterConfig) {
          if (tweet.createdAt < filterConfig.dateFrom) return false; 
        }
        if ('hashtags' in filterConfig) {
          const every = filterConfig.hashtags.every((hashtag) => {
            return tweet.text.split(' ').filter(word => word[0] === '#').includes(hashtag);
          });
          if(!every) return false;
        }
        if ('text' in filterConfig) {
          if(!tweet.text.split('').filter(symbol => symbol !== '#').join('').includes(filterConfig.text)) return false;
        }
        return true;
      });

    }

    for (let i = 0; i < top; i++) {
      if(workingTweetsArr[i] === undefined) break;
      resultTweetsArr.push(workingTweetsArr[i])      
    }

    return resultTweetsArr.sort((a, b) => b.createdAt - a.createdAt);
  };

  const getTweet = (id) => {
    for (let i = 0; i < tweets.length; i++) {
      if (tweets[i].id === id) return tweets[i];
    }
    return {};
  };

  const validateTweet = (tweet) => {
    
    if (typeof tweet.id !== 'string' || tweet.id.length === 0) return false;
    if (typeof tweet.text !== 'string' || tweet.text.length > maxTextLength || tweet.text.length === 0) return false;
    if (!(tweet.createdAt instanceof Date)) return false;
    if (typeof tweet.author !== 'string' || tweet.author.length === 0) return false;
    if (!(tweet.comments instanceof Array)) return false;
    
    if (tweet.comments.length > 0) {
      const everyValid = tweet.comments.every((comment) => {
        if (typeof comment.id !== 'string' || comment.id.length === 0) return false;
        if (typeof comment.text !== 'string' || comment.text.length > maxTextLength || comment.text.length === 0) return false;
        if (!(comment.createdAt instanceof Date)) return false;
        if (typeof comment.author !== 'string' || comment.author.length === 0) return false;
        return true;
      })
      if (!everyValid) return false;
    }

    return true;
  };

  const addTweet = (text) => {

    const tweet = {
      id: +tweets[tweets.length - 1].id + 1 + '',
      text: text,
      createdAt: new Date(),
      author: user,
      comments: []
    };

    if (validateTweet(tweet)) {
      tweets.push(tweet);
      return true;
    } else return false;
  };

  const editTweet = (id, text) => {
    const tweet = getTweet(id + '');
    
    if (user === tweet.author && (typeof text === 'string') && text.length <= maxTextLength) {
      tweet.text = text;
      return true;
    } else return false;
  };

  const removeTweet = (id) => {
    const tweet = getTweet(id + '');
    const indexOfTweet = tweets.indexOf(tweet);

    if (user === tweet.author && indexOfTweet >= 0) {
      tweets.splice(indexOfTweet, 1);
      return true;
    } else return false;
  };
  
  return {
    getTweets,
    getTweet,
    validateTweet,
    addTweet,
    editTweet,
    removeTweet,
  }
})();

//myModule.getTweets(0, 20,{dateFrom: new Date(1644660000000)})
//myModule.getTweet('11')
// myModule.editTweet('17', 'sadasdasdasdasdas')