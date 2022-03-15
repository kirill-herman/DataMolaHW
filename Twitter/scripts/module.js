;const myModule = (function() {
  
  let user = 'Kirill';
  let id = '50';

  const maxTextLength = 280;
  
  const getTweets = (skip = 0, top = 10, filterConfig = {}) => {
    const resultTweetsArr = [];
    let workingTweetsArr = tweets;
    
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

    workingTweetsArr = workingTweetsArr.sort((a, b) => b.createdAt - a.createdAt)

    for (let i = skip; i < skip + top; i++) {
      if(workingTweetsArr[i] === undefined) break;
      resultTweetsArr.push(workingTweetsArr[i])      
    }

    return resultTweetsArr;
  };

  const getTweet = (id) => {
    for (let i = 0; i < tweets.length; i++) {
      if (tweets[i].id === id + '') return tweets[i];
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
      const everyValid = tweet.comments.every((comment) => validateComment(comment))
      if (!everyValid) return false;
    }

    return true;
  };

  const addTweet = (text) => {

    const tweet = {
      id: (tweets.sort((a, b) => a.id - b.id)[tweets.length - 1]) ? (+tweets.sort((a, b) => a.id - b.id)[tweets.length - 1].id + 1 + '') : '0',
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
    
    if (!validateTweet(tweet)) return false; 

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

  const validateComment = (comment) => {
    if (typeof comment.id !== 'string' || comment.id.length === 0) return false;
    if (typeof comment.text !== 'string' || comment.text.length > maxTextLength || comment.text.length === 0) return false;
    if (!(comment.createdAt instanceof Date)) return false;
    if (typeof comment.author !== 'string' || comment.author.length === 0) return false;
    return true;
  };

  const addComment = (id, text) => {
    const tweet = getTweet(id + '');

    if (Object.keys(tweet).length === 0) return false;
    if (text.length > maxTextLength || typeof text !== 'string') return false;

    const comment = {
      id: (tweet.comments.sort((a, b) => a.id - b.id)[tweet.comments.length - 1]) ? (+tweet.comments.sort((a, b) => a.id - b.id)[tweet.comments.length - 1].id + 1 + '') : (id + '' + 1),
      text: text,                                                    
      createdAt: new Date(),
      author: user,
    };

    if (!validateComment(comment)) return false;
    
    tweet.comments.push(comment);

    return true;
  };

  const changeUser = (newUser) => {
    user = newUser;
  };

  
  return {
    getTweets,
    getTweet,
    validateTweet,
    addTweet,
    editTweet,
    removeTweet,
    validateComment,
    addComment,
    changeUser,
  }
})();

// myModule.getTweets(0, 20,{dateFrom: new Date(1644660000000)})
// myModule.getTweet('11')
// myModule.editTweet('17', 'sadasdasdasdasdas')
// myModule.validateTweet(tweets[1]) 

// for (let i = 0; i < 20; i++) {myModule.removeTweet(i)}
// myModule.changeUser('NeKirill')
// myModule.removeTweet(0)
// myModule.addTweet('testestetdast')
// myModule.addComment('0', 'dsadasdqwdqdqdqwdqd')


myModule.getTweets();
myModule.getTweets(5, 15);
myModule.getTweets(0, 5, {author: "Kirill"});
myModule.changeUser('NeKirill');

for (let i = 0; i < 10; i++) {
  myModule.addTweet('tweet #text ' + i);
}

myModule.getTweets(0, 5, {author: "Kisadadasd"});
myModule.getTweets(0, 0, {author: "NeKirill"});
myModule.getTweets(0, 5, {asdauthor: "Kisadadasd"});
myModule.getTweets(0, 40, {author: "NeKirill"});
myModule.getTweets(10, 40, {author: "NeKirill"});
myModule.getTweets(0,40, {hashtags: ['#text'], text: '3'})
myModule.getTweets(0,40, {hashtags: ['#text']})

myModule.getTweet(1)
myModule.getTweet("2")
myModule.getTweet("2dsadas")

myModule.addTweet(212);
