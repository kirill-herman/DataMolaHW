import Tweet from './tweet.js';

const msPerMin = 100000;
let tweets = [];
for (let i = tweets.length; i < 20; i++) {
  tweets.push(new Tweet('#Lorem ipsum #dolor sit amet consectetur adipisicing elit. ' + i, i+'', new Date(Date.parse(new Date('2022-02-12T12:37')) + i * msPerMin), 'Kirill', [{ text: 'Wow!', id: i + '1', createdAt: new Date(Date.parse(new Date('2022-02-12T13:37')) + i * msPerMin), author: 'NeKirill' }]));
}

tweets = JSON.stringify(tweets);
// localStorage.setItem('tweets', tweets);

export default tweets;
