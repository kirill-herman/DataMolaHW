;const myModule = (function() {
  let user = 'Kirill';
  
  //const test = () => tweets;
  
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

    return resultTweetsArr
  };
  
  return {
  //  test,
  getTweets,
  }
})();