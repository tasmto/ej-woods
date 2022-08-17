import { ProductType } from '@/features/products/types';

const products: ProductType[] = [
  {
    id: '1',
    name: 'Mopane Chunks/ Knuckles (Namibian Hardwood) Knuckles',
    type: 'wood',
    price: 10,
    weight: { value: 1, unit: 'kg' },
    description:
      "Chuck Norris' hand is the only hand that can beat a Royal Flush. Chuck Norris is currently suing NBC, claiming Law and Order are trademarked names for his left and right legs, Chuck Norris does not get frostbite. Chuck Norris bites frost. Chuck Norris does not sleep.",
    primaryImage:
      'https://images.unsplash.com/photo-1522401411131-5d6159fe88e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1561458338-60c444223320?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1617410225897-c9d260e3055e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1551364827-375ede57f397?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njh8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    ],
    categories: 'polyx',
    crossSells: ['2', '3'],
    countInStock: 4,
    published: true,
  },
  {
    id: '2',
    name: 'Blue Gum Knuckles',
    type: 'wood',
    price: 10,
    weight: { value: 1, unit: 'kg' },
    description:
      "The quickest way to a man's heart is with Chuck Norris' fist. Chuck Norris doesn't churn butter. He roundhouse kicks the cows and the butter comes straight out. The quickest way to a man's heart is with Chuck Norris' fist Chuck Norris doesn't churn butter. He roundhouse kicks the cows and the butter comes straight out. Fool me once, shame on you. Fool Chuck Norris once and he will roundhouse you in the face, Chuck Norris is the baddest man on four legs. Contrary to popular belief, Chuck Norris, not the box jellyfish of northern Australia, is the most venomous creature on earth. ",
    primaryImage:
      'https://images.unsplash.com/photo-1516405571520-680c0e253997?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1561458338-60c444223320?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1617410225897-c9d260e3055e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1551364827-375ede57f397?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njh8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    ],
    categories: ['oiled', 'osmo'],
    crossSells: ['1', '3'],
    countInStock: 0,
    published: true,
  },
  {
    id: '3',
    name: 'Kameeldoring Hardwood (Namibian)',
    type: 'wood',
    price: 10,
    weight: { value: 1.25, unit: 'kg' },
    description:
      "He waits There is no theory of evolution. Just a list of animals Chuck Norris allows to live, Tunguska was hit by a meteor and killed all vegetation in the area, if you call the meteor Chuck Norris. Chuck Norris once bowled a 300... without a ball... he wasn't even in a bowling ally Chuck Norris doesn't read books. He stares them down until he gets the information he wants. ",
    primaryImage:
      'https://images.unsplash.com/photo-1506968430777-bf7784a87f23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1561458338-60c444223320?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1617410225897-c9d260e3055e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1551364827-375ede57f397?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njh8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    ],
    categories: ['polyx', 'osmo'],
    crossSells: ['2', '1'],
    countInStock: 13,
    published: true,
  },
  {
    id: '4',
    name: 'Namibian Hardwood Braai Mix / Doringhout',
    type: 'wood',
    price: 10,
    weight: { value: 1.25, unit: 'kg' },
    description:
      "He waits There is no theory of evolution. Just a list of animals Chuck Norris allows to live, Tunguska was hit by a meteor and killed all vegetation in the area, if you call the meteor Chuck Norris. Chuck Norris once bowled a 300... without a ball... he wasn't even in a bowling ally Chuck Norris doesn't read books. He stares them down until he gets the information he wants. ",
    primaryImage:
      'https://images.unsplash.com/photo-1506968430777-bf7784a87f23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1561458338-60c444223320?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1617410225897-c9d260e3055e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1551364827-375ede57f397?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njh8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    ],
    categories: ['polyx', 'osmo'],
    crossSells: ['2', '1'],
    countInStock: 13,
    published: true,
  },
  {
    id: '5',
    name: 'Wooden slate wall',
    type: 'furniture',
    price: 2500,
    weight: { value: 5, unit: 'kg' },
    description:
      "Crop circles are Chuck Norris' way of telling the world that sometimes corn needs to lie down When Chuck Norris does a pushup, he isn't lifting himself up, he's pushing the Earth down, A Handicapped parking sign does not signify that this spot is for handicapped people. It is actually in fact a warning, that the spot belongs to Chuck Norris and that you will be handicapped if you park there.",
    primaryImage:
      'https://images.unsplash.com/photo-1515713519566-6f9bf3b4a07a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHdvb2RlbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    gallery: [
      'https://images.unsplash.com/photo-1561458338-60c444223320?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1617410225897-c9d260e3055e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1551364827-375ede57f397?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njh8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    ],
    categories: ['slate', 'wall', 'tag'],
    crossSells: ['6', '7', '8'],
    countInStock: 'unlimited',
    published: true,
  },
  {
    id: '6',
    name: 'Wooden window and frame',
    type: 'furniture',
    price: 200,
    weight: { value: 0.25, unit: 'kg' },
    description:
      "Chuck Norris doesn't get laid. He lays people on the ground. Chuck Norris uses pepper spray to spice up his steaks. There is no chin behind Chuck Norris' beard. There is only another fist When the Boogeyman goes to sleep every night, he checks his closet for Chuck Norris. The chief export of Chuck Norris is Pain. There is no theory of evolution. Just a list of creatures Chuck Norris has allowed to live.",
    primaryImage:
      'https://images.unsplash.com/photo-1514378506609-214c4c36d24d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHdvb2RlbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    gallery: [
      'https://images.unsplash.com/photo-1561458338-60c444223320?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1617410225897-c9d260e3055e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1551364827-375ede57f397?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njh8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    ],
    categories: ['slate', 'wall', 'tag'],
    crossSells: ['5', '7', '8'],
    countInStock: 13,
    published: true,
  },
  {
    id: '7',
    name: 'Wooden frames and beams',
    type: 'furniture',
    price: 500,
    weight: { value: 30, unit: 'kg' },
    description:
      "Chuck Norris is my Homeboy. Chuck Norris uses pepper spray to spice up his steaks, Chuck Norris is the reason why Waldo is hiding, Someone once videotaped Chuck Norris getting pissed off. It was called Walker: Texas Chain Saw Massacre, The leading causes of death in the United States are: 1. Heart Disease 2. Chuck Norris 3. Cancer Guns don't kill people.",
    primaryImage:
      'https://images.unsplash.com/photo-1522027665652-ee10c408bd1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fHdvb2RlbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    gallery: [
      'https://images.unsplash.com/photo-1561458338-60c444223320?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1617410225897-c9d260e3055e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1551364827-375ede57f397?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njh8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    ],
    categories: ['slate', 'wall', 'tag'],
    crossSells: ['5', '6', '8'],
    countInStock: 13,
    published: true,
  },
  {
    id: '8',
    name: 'Treated wooden beams',
    type: 'furniture',
    price: 3500,
    weight: { value: 30, unit: 'kg' },
    description:
      "Chuck Norris kills people, Chuck Norris doesn't have one for the rorad - the road has one for Chuck Norris. If you spell Chuck Norris in Scrabble, you win. Forever. What was going through the minds of all of Chuck Norris' victims before they died? His shoe, Chuck Norris doesn't wear a watch. HE decides what time it is.",
    primaryImage:
      'https://images.unsplash.com/photo-1508285668845-be0d391462d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDd8fHdvb2RlbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    gallery: [
      'https://images.unsplash.com/photo-1561458338-60c444223320?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1617410225897-c9d260e3055e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1551364827-375ede57f397?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njh8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    ],
    categories: ['slate', 'wall', 'tag'],
    crossSells: ['5', '6', '7'],
    countInStock: 13,
    published: false,
  },
];

export default products;
