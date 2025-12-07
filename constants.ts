import { MenuItem, SectionType } from './types';

export const ADMIN_ROUTE = 'admin-control-panel-chz';
export const ADMIN_KEY = 'Faizan';

// Helper to generate consistent, relevant images based on prompts
export const getImageUrl = (prompt: string, seed: string, width: number = 800, height: number = 600) => {
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + " photorealistic food photography high quality 4k")}?width=${width}&height=${height}&seed=${seed}&nologo=true`;
};

export const MENU_ITEMS: MenuItem[] = [
  // STARTERS
  {
    id: 's1',
    category: SectionType.STARTERS,
    name: 'Cheesy Sticks',
    price: 630,
    description: 'Freshly baked bread filled with the yummiest cheese blend to satisfy your cravings, served with dip sauce.',
    imageUrl: getImageUrl('baked cheesy bread sticks with dipping sauce', 's1')
  },
  {
    id: 's2',
    category: SectionType.STARTERS,
    name: 'Calzone Chunks',
    price: 1150,
    description: '4 pcs baked rolls of pizza crust stuffed with cheese & served with dip sauce.',
    imageUrl: getImageUrl('golden baked calzone rolls with cheese', 's2')
  },
  // PIZZAS - Crown Crust
  {
    id: 'p1',
    category: SectionType.PIZZAS,
    subCategory: 'Crown Crust / Stuff Crust',
    name: 'Crown Crust Pizza',
    price: 'Reg 1550, Lrg 2050, Party 2550',
    description: 'A favorite blend of special sauces, cheese & delightful tikka, mushroom, capsicum, olives, onion and jalapenos.',
    imageUrl: getImageUrl('crown crust pizza with kebab stuffed crust', 'p1')
  },
  {
    id: 'p2',
    category: SectionType.PIZZAS,
    subCategory: 'Crown Crust / Stuff Crust',
    name: 'Stuff Crust Pizza',
    price: 'Reg 1600, Lrg 2150, Party 2650',
    description: 'Special blend of sauces, cheese & delightful tikka, mushroom, capsicum, olives, onion, jalapenos and corn.',
    imageUrl: getImageUrl('cheese stuffed crust pizza slice pull', 'p2')
  },
  // PIZZAS - Cheezy Treats
  {
    id: 'p3',
    category: SectionType.PIZZAS,
    subCategory: 'Cheezy Treats',
    name: 'Chicken Extreme',
    price: 1200,
    description: 'Special sauce, cheese mix with onions, jalapenos, mushrooms, chicken tikka & three special flavors of toppings.',
    imageUrl: getImageUrl('loaded chicken extreme pizza with lots of toppings', 'p3')
  },
  {
    id: 'p4',
    category: SectionType.PIZZAS,
    subCategory: 'Cheezy Treats',
    name: 'Cheezious Special',
    price: 1300,
    description: 'Delicious mix of onions, capsicum, mushrooms, olives, cheese, chicken chunks & the combination of topping.',
    imageUrl: getImageUrl('supreme special pizza with olives capsicum mushroom', 'p4')
  },
  {
    id: 'p5',
    category: SectionType.PIZZAS,
    subCategory: 'Cheezy Treats',
    name: 'Behari Kebab Pizza',
    price: 1300,
    description: 'Loaded with cheese mix, onion, jalapeno, mushroom, olives and juicy spices kebab topping.',
    imageUrl: getImageUrl('pizza with behari kebab meat toppings', 'p5')
  },
  {
    id: 'p6',
    category: SectionType.PIZZAS,
    subCategory: 'Cheezy Treats',
    name: 'Chicken Tikka',
    price: 1200,
    description: 'Made with pizza sauce, cheese mix, chicken tikka, mushroom and corn for a delightful taste experience.',
    imageUrl: getImageUrl('chicken tikka pizza pakistani style', 'p6')
  },
    {
    id: 'p7',
    category: SectionType.PIZZAS,
    subCategory: 'Cheezy Treats',
    name: 'Chicken Lover',
    price: 1200,
    description: 'A delightful mix of cheese, chicken tikka, capsicum, onion & generous layer of tikka on top.',
    imageUrl: 'https://image.pollinations.ai/prompt/pizza%20loaded%20with%20chicken%20chunks%20cheese?width=800&height=600&seed=p7&nologo=true'
  },
  {
    id: 'p8',
    category: SectionType.PIZZAS,
    subCategory: 'Cheezy Treats',
    name: 'Chicken Tandoori',
    price: 1200,
    description: 'A special blend of sauce, pizza sauce, cheese, tikka with delicious topping of onions, jalapenos and black olives.',
    imageUrl: getImageUrl('tandoori chicken pizza with jalapenos and olives', 'p8')
  },
  // PIZZAS - Somewhat Local
  {
    id: 'p9',
    category: SectionType.PIZZAS,
    subCategory: 'Somewhat Local',
    name: 'Hot n Spicy',
    price: 950,
    description: 'Fiery flavor, onions and jalapenos, pizza sauce, cheese mix and delicious mushrooms and tomatoes.',
    imageUrl: getImageUrl('spicy pizza with red chillies and jalapenos', 'p9')
  },
  {
    id: 'p10',
    category: SectionType.PIZZAS,
    subCategory: 'Somewhat Local',
    name: 'Chicken Fajita',
    price: 950,
    description: 'An authentic taste of Fajita marinated chicken, onions, capsicum, olives and mushrooms.',
    imageUrl: getImageUrl('chicken fajita pizza with green peppers and onions', 'p10')
  },
  {
    id: 'p11',
    category: SectionType.PIZZAS,
    subCategory: 'Somewhat Local',
    name: 'Vegetable Pizza',
    price: 950,
    description: 'A treat for vegetable lovers with mozzarella cheese, capsicum, onion, mushroom, corn, tomatoes, and black olives.',
    imageUrl: getImageUrl('fresh vegetable pizza with corn olives tomatoes', 'p11')
  },
  // PIZZAS - Somewhat Sooper
  {
    id: 'p12',
    category: SectionType.PIZZAS,
    subCategory: 'Somewhat Sooper',
    name: 'Chicken Supreme',
    price: 970,
    description: 'Favorite sauce, cheese mix, mushrooms, chicken chunks, pizza sauce, black olives, and cheese mix.',
    imageUrl: getImageUrl('chicken supreme pizza', 'p12')
  },
  {
    id: 'p13',
    category: SectionType.PIZZAS,
    subCategory: 'Somewhat Sooper',
    name: 'Black Pepper Tikka',
    price: 970,
    description: 'Loaded with black pepper, chicken, sauce, cheese, mushrooms and olives on a bed of lettuce.',
    imageUrl: getImageUrl('black pepper chicken pizza', 'p13')
  },
   {
    id: 'p14',
    category: SectionType.PIZZAS,
    subCategory: 'Somewhat Sooper',
    name: 'Chicken Mushroom',
    price: 970,
    description: 'Topped with a delectable blend of cheese mix, chicken chunks, mushrooms, and savory sauce.',
    imageUrl: getImageUrl('chicken and mushroom pizza', 'p14')
  },
  {
    id: 'p15',
    category: SectionType.PIZZAS,
    subCategory: 'Somewhat Sooper',
    name: 'Chicken Pepperoni',
    price: 970,
    description: 'Topped with a rich blend of cheese, chicken and pepperoni, and pizza sauce.',
    imageUrl: getImageUrl('delicious pepperoni pizza', 'p15')
  },
    {
    id: 'p16',
    category: SectionType.PIZZAS,
    subCategory: 'Somewhat Sooper',
    name: 'Sausage Pizza',
    price: 970,
    description: 'The delectable combination of pizza sauce, sausage, cheese mix with chicken chunks and mushrooms.',
    imageUrl: getImageUrl('italian sausage pizza', 'p16')
  },
  {
    id: 'p17',
    category: SectionType.PIZZAS,
    subCategory: 'Somewhat Sooper',
    name: 'Euro',
    price: 970,
    description: 'Cheese mix, smoky chicken, tandoori, capsicum, mushroom, olives, corns, fresh tomatoes, pizza sauce and olives.',
    imageUrl: getImageUrl('euro style smoked chicken pizza', 'p17')
  },
   {
    id: 'p18',
    category: SectionType.PIZZAS,
    subCategory: 'Somewhat Sooper',
    name: 'Cheeze Lover',
    price: 970,
    description: 'A cheesy delight with a luscious blend of pizza sauce and cheese mix.',
    imageUrl: getImageUrl('extra cheese margherita pizza', 'p18')
  },
  // CHEESY & CRISPY
  {
    id: 'cc1',
    category: SectionType.CHEESY_CRISPY,
    name: 'Fettuccine Alfredo Pasta',
    price: 1050,
    description: 'Fettuccine pasta with creamy white sauce with mushroom and chicken chunks.',
    imageUrl: getImageUrl('creamy fettuccine alfredo pasta with chicken', 'cc1')
  },
  {
    id: 'cc2',
    category: SectionType.CHEESY_CRISPY,
    name: 'Crunchy Chicken Pasta',
    price: 1050,
    description: 'Fettuccine pasta with creamy cheese sauce topped with crispy chicken & mushroom.',
    imageUrl: getImageUrl('creamy pasta topped with crispy fried chicken strips', 'cc2')
  },
    {
    id: 'cc3',
    category: SectionType.CHEESY_CRISPY,
    name: 'Special Roasted Platter',
    price: 1200,
    description: '4 pcs baked rolls of pizza crust stuffed with fries & dip sauce.',
    imageUrl: getImageUrl('roasted chicken platter with fries and rolls', 'cc3')
  },
   {
    id: 'cc4',
    category: SectionType.CHEESY_CRISPY,
    name: 'Classic Roll Platter',
    price: 1200,
    description: '4 pcs baked rolls of pizza crust stuffed with fries & dip sauce.',
    imageUrl: getImageUrl('baked pizza rolls platter', 'cc4')
  },
  {
    id: 'cc5',
    category: SectionType.CHEESY_CRISPY,
    name: 'Euro Sandwich',
    price: 920,
    description: 'Chicken tikka with special sauce, cheese, olives, jalapeno, tomato, salt and crispy fries, served with soft fries.',
    imageUrl: getImageUrl('club sandwich with fries platter', 'cc5')
  },
  {
    id: 'cc6',
    category: SectionType.CHEESY_CRISPY,
    name: 'Mexican Sandwich',
    price: 920,
    description: 'Black pepper chicken with fresh salad, tomato, cucumber, iceberg, lettuce, and special sauce.',
    imageUrl: getImageUrl('spicy mexican chicken sandwich with fries', 'cc6')
  },
  {
    id: 'cc7',
    category: SectionType.CHEESY_CRISPY,
    name: 'Pizza Stacker',
    price: 920,
    description: 'A unique blend of delicious sauce, crispy chicken and pizza crust.',
    imageUrl: getImageUrl('crispy chicken burger stacker', 'cc7')
  },
  // SIDE ORDERS
  {
    id: 'so1',
    category: SectionType.SIDE_ORDERS,
    name: 'Fried Chicken (1 pc)',
    price: 300,
    description: '1 Cheese piece.',
    imageUrl: getImageUrl('crispy fried chicken piece', 'so1')
  },
  {
    id: 'so2',
    category: SectionType.SIDE_ORDERS,
    name: 'Chicken Nuggets (8 pcs)',
    price: 500,
    description: 'Crispy golden nuggets.',
    imageUrl: getImageUrl('plate of chicken nuggets with ketchup', 'so2')
  },
  {
    id: 'so3',
    category: SectionType.SIDE_ORDERS,
    name: 'Fries',
    price: 300,
    description: 'Classic salty fries.',
    imageUrl: getImageUrl('french fries in a basket', 'so3')
  },
  // DEALS
  {
    id: 'd1',
    category: SectionType.DEALS,
    name: 'Hoppy Burger',
    price: 380,
    description: 'Delicious burger deal.',
    imageUrl: getImageUrl('delicious beef burger with cheese', 'd1')
  },
  {
    id: 'd2',
    category: SectionType.DEALS,
    name: 'Bazinga Burger',
    price: 560,
    description: 'Big crunchy burger deal.',
    imageUrl: getImageUrl('massive crispy zinger burger meal', 'd2')
  },
];