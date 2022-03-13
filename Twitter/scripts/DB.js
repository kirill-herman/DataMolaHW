const tweets = [
  {
    id: '0',
    text: '#HelloKitty is my favorite direction in art',                    
    createdAt: new Date('2022-02-12T12:37'),
    author: 'NeKirill',
    comments: [   
      {
        id: '01',
        text: 'ifkurm',                                                    
        createdAt: new Date('2022-02-12T13:37'),
        author: 'Kirill',
      },
      {
        id: '02',
        text: 'Me too',                                                    
        createdAt: new Date('2022-02-12T14:39'),
        author: 'Oleg',
      },
    ],
  },
  {
    id: '1',
    text: 'Мне подарили кота. Оказалось, что этот кот - Шлепа',                    
    createdAt: new Date('2022-02-12T17:54'),
    author: 'Kirill',
    comments: [   
      {
        id: '11',
        text: 'Wow!',                                                    
        createdAt: new Date('2022-02-12T13:37'),
        author: 'NeKirill',
      },
      {
        id: '12',
        text: 'Круто!',                                                    
        createdAt: new Date('2022-02-12T14:39'),
        author: 'Oleg',
      },
    ],
  },
];

const msPerMin = 100000;

for (let i = tweets.length; i < 20; i++) {
  tweets.push({
    id: i+'',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ' + i,
    createdAt: new Date(Date.parse(new Date('2022-02-12T12:37')) + i * msPerMin),
    author: 'Kirill',
    comments: [
      {
        id: i + '1',
        text: 'Wow!',                                                    
        createdAt: new Date(Date.parse(new Date('2022-02-12T13:37')) + i * msPerMin),
        author: 'NeKirill',
      },
      {
        id: i + '2',
        text: 'Круто!',                                                    
        createdAt: new Date(Date.parse(new Date('2022-02-12T14:39')) + i * msPerMin),
        author: 'Oleg',
      },
    ]
  });
  
}


// console.log(tweets[0].createdAt.getHours());   
// console.log(tweets[0]);   
// console.log(tweets[4]);   