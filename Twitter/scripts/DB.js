// const tweets = [
//   {
//     id: '0',
//     text: '#HelloKitty is my favorite direction in art',                    
//     createdAt: new Date('2022-02-12T12:37'),
//     author: 'NeKirill',
//     comments: [   
//       {
//         id: '01',
//         text: 'ifkurm',                                                    
//         createdAt: new Date('2022-02-12T13:37'),
//         author: 'Kirill',
//       },
//       {
//         id: '02',
//         text: 'Me too',                                                    
//         createdAt: new Date('2022-02-12T14:39'),
//         author: 'Oleg',
//       },
//     ],
//   },
//   {
//     id: '1',
//     text: 'Мне подарили кота. Оказалось, что этот кот - Шлепа',                    
//     createdAt: new Date('2022-02-12T17:54'),
//     author: 'Kirill',
//     comments: [   
//       {
//         id: '11',
//         text: 'Wow!',                                                    
//         createdAt: new Date('2022-02-12T13:37'),
//         author: 'NeKirill',
//       },
//       {
//         id: '12',
//         text: 'Круто!',                                                    
//         createdAt: new Date('2022-02-12T14:39'),
//         author: 'Oleg',
//       },
//     ],
//   },
// ];
import Tweet from './tweet.js';
import Comment from './comment.js'

const msPerMin = 100000;
const tweets = [];
for (let i = tweets.length; i < 20; i++) {
  tweets.push(new Tweet('#Lorem ipsum #dolor sit amet consectetur adipisicing elit. ' + i, i+'', new Date(Date.parse(new Date('2022-02-12T12:37')) + i * msPerMin), 'Kirill', [{ text: 'Wow!', id: i + '1', createdAt: new Date(Date.parse(new Date('2022-02-12T13:37')) + i * msPerMin), author: 'NeKirill' }]));
}

export default tweets;
