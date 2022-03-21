class Tweet {
  static maxTextLength = 280;
  
  constructor (id = this._getNewID(), createAt = new Date(), author = TweetCollection.user, text, comments = []) {
    this._id = id;
    this._createAt = createAt;
    this._author = author;
    
    this.text = text;
    this.comments = comments;
  }

  get id () {
    return this._id;
  }
  set id (id) {
    console.log('can\'t set id');
  }

  get createAt () {
    return this._createAt;
  }
  set createAt (date) {
    console.log('can\'t set date of creation');
  }

  get author () {
    return this._author
  }
  set author (name) {
    console.log('can\'t set author name');
  }

  static validate (tweet) {
    if (typeof tweet.id !== 'string' || tweet.id.length === 0) return false;
    if (typeof tweet.text !== 'string' || tweet.text.length > maxTextLength || tweet.text.length === 0) return false;
    if (!(tweet.createdAt instanceof Date)) return false;
    if (typeof tweet.author !== 'string' || tweet.author.length === 0) return false;
    
    if (!(tweet.comments instanceof Array)) return false;
    if (tweet.comments.length > 0) {
      const everyValid = tweet.comments.every((comment) => Comment.validate(comment))
      if (!everyValid) return false;
    }

    return true;
  }

  addComment(id, text) {
    const comment = new Comment(id, text);
    if (!validateComment(comment)) return false;

    this.comments.push(comment);
    return true;
  };

  _getNewID () {
    return Date.now() + Math.floor(Math.random() * 1e10) + '';
  }
}




class Comment {  
  static maxTextLength = 280; 

  constructor (id = this._getNewID(), createAt = new Date(), author = TweetCollection.user, text) {
    this._id = id;
    this._createAt = createAt;
    this._author = author;
    
    this.text = text;
  }

  get id () {
    return this._id;
  }
  set id (id) {
    console.log('can\'t set id');
  }

  get createAt () {
    return this._createAt;
  }
  set createAt (date) {
    console.log('can\'t set date of creation');
  }

  get author () {
    return this._author
  }
  set author (name) {
    console.log('can\'t set author name');
  }

  static validate(comment) {
    if (typeof comment.id !== 'string' || comment.id.length === 0) return false;
    if (typeof comment.text !== 'string' || comment.text.length > maxTextLength || comment.text.length === 0) return false;
    if (!(comment.createdAt instanceof Date)) return false;
    if (typeof comment.author !== 'string' || comment.author.length === 0) return false;
    return true;
  }

  _getNewID () {
    return (Date.now() + Math.floor(Math.random() * 1e10) + '').split('').reverse().join('');
  }
}



class TweetCollection {
  static _user = 'Kirill';
  
  static get user() {
    return TweetCollection._user;
  }
  static set user(value) {
    TweetCollection._user = value;
  }

  getPage(skip = 0, top = 10, filterConfig = {}) {
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
          if(!tweet.text.replace(/#/g, '').includes(filterConfig.text)) return false;
        }
        return true;
      });
    }

    workingTweetsArr = workingTweetsArr.sort((a, b) => b.createdAt - a.createdAt)

    return workingTweetsArr.slice(skip, skip + top);
  };

  getTweet(id) {
    for (let i = 0; i < tweets.length; i++) {
      if (tweets[i].id === id + '') return tweets[i];
    }
    return null;
  };
  
}