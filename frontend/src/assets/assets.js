import logo from './images/logo.png'
import menu1 from './images/menu1.png'
import menu2 from './images/menu2.png'
import menu3 from './images/menu3.png'
import menu4 from './images/menu4.png'
import menu5 from './images/menu5.png'
import menu6 from './images/menu6.png'
import menu7 from './images/menu7.jpg'
import Tteokbokki from './images/Tteokbokki.png'
import BeefMandu from './images/BeefMandu.png'
import ChickenMandu from './images/ChickenMandu.jpg'
import VegetablePancake from './images/VegetablePancake.jpg'
import BeefKimbap from './images/BeefKimbap.jpg'
import BeefBulgogi from './images/BeefBulgogi.jpg'
import SpicyBeefBulgogi from './images/SpicyBeefBulgogi.png'
import ChickenBulgogi from './images/ChickenBulgogi.png'
import BeefGalbi from './images/BeefGalbi.jpg'
import BBQChicken from './images/BBQChicken.png'
import BeefBibimbap from './images/BeefBibimbap.jpg'
import ChickenBibimbap from './images/ChickenBibimbap.jpg'
import KimchiFriedRice from './images/KimchiFriedRice.jpg'
import BeefJapchae from './images/BeefJapchae.jpg'
import Jajangmyeon from './images/Jajangmyeon.jpg'
import SpicyRamyeon from './images/SpicyRamyeon.png'
import BibimGuksu from './images/BibimGuksu.jpg'
import KimchiJjigae  from './images/KimchiJjigae.png'
import SundubuJjigae from './images/SundubuJjigae.jpg'
import BeefGalbitang from './images/BeefGalbitang.png'
import ChickenSoup from './images/ChickenSoup.png'
import Kimchi from './images/Kimchi.png'
import PickledRadish from './images/PickledRadish.jpg'
import PotatoSalad from './images/PotatoSalad.png'
import SteamedRice from './images/SteamedRice.png'
import SeaweedSheets from './images/SeaweedSheets.jpg'
import MangoBingsu from './images/MangoBingsu.png'
import StrawberryBingsu from './images/StrawberryBingsu.png'
import SweetPancake from './images/SweetPancake.jpg'
import RiceCakes from './images/RiceCakes.jpg'
import MochiIceCream from './images/MochiIceCream.jpg'


export const assets = {
    logo,
};

export const menu_list = [
    {   
        id: "Appetizers",
        menu_name: "Appetizers",
        menu_image: menu1
    },
    {
        id: "BBQ",
        menu_name: "BBQ & Grills",
        menu_image: menu2
    },
    {
        id: "RiceBowls",
        menu_name: "Rice Bowls",
        menu_image: menu3
    },
    {
        id: "Noodles",
        menu_name: "Noodles",
        menu_image: menu4
    },
    {
        id: "Soups",
        menu_name: "Soups & Stews",
        menu_image: menu5
    },
    {
        id: "Side Dishes",
        menu_name: "Side Dishes",
        menu_image: menu6
    },
    {
        id: "Desserts",
        menu_name: "Desserts",
        menu_image: menu7
    }
]

export const food_list = [
  // Appetizers
  {
    _id: "1",
    name: "Spicy Tteokbokki",
    image: Tteokbokki,
    price: 6.99,
    description: "Chewy rice cakes in a rich, mildly spicy red pepper sauce.",
    category: "Appetizers",
  },
  {
    _id: "2",
    name: "Beef Mandu",
    image: BeefMandu,
    price: 7.99,
    description: "Pan-fried dumplings filled with seasoned halal beef and vegetables.",
    category: "Appetizers",
  },
  {
    _id: "3",
    name: "Chicken Mandu",
    image: ChickenMandu,
    price: 7.49,
    description: "Pan-fried dumplings filled with seasoned chicken and vegetables.",
    category: "Appetizers",
  },
  {
    _id: "4",
    name: "Vegetable Pancake",
    image: VegetablePancake,
    price: 6.99,
    description: "Crispy savory pancake made with fresh mixed vegetables.",
    category: "Appetizers",
  },
  {
    _id: "5",
    name: "Beef Kimbap",
    image: BeefKimbap,
    price: 8.49,
    description: "Seaweed rice rolls filled with halal beef, egg, and fresh vegetables.",
    category: "Appetizers",
  },

  // BBQ & Grills
  {
    _id: "6",
    name: "Beef Bulgogi",
    image: BeefBulgogi,
    price: 14.99,
    description: "Thin slices of tender marinated halal beef, grilled with sweet savory sauce.",
    category: "BBQ & Grills",
  },
  {
    _id: "7",
    name: "Spicy Beef Bulgogi",
    image: SpicyBeefBulgogi,
    price: 15.49,
    description: "Tender marinated halal beef grilled in a rich and spicy sauce.",
    category: "BBQ & Grills",
  },
  {
    _id: "8",
    name: "Chicken Bulgogi",
    image: ChickenBulgogi,
    price: 12.99,
    description: "Tender marinated chicken grilled with a sweet and savory sauce.",
    category: "BBQ & Grills",
  },
  {
    _id: "9",
    name: "Beef Galbi",
    image: BeefGalbi,
    price: 18.99,
    description: "Slow-marinated halal beef short ribs grilled until tender and flavorful.",
    category: "BBQ & Grills",
  },
  {
    _id: "10",
    name: "BBQ Chicken",
    image: BBQChicken,
    price: 13.49,
    description: "Grilled chicken coated in a smoky, sweet, and lightly spicy barbecue sauce.",
    category: "BBQ & Grills",
  },

  // Rice Bowls
  {
    _id: "11",
    name: "Beef Bibimbap",
    image: BeefBibimbap,
    price: 13.99,
    description: "Warm rice topped with marinated beef, vegetables, egg, and spicy sauce.",
    category: "Rice Bowls",
  },
  {
    _id: "12",
    name: "Chicken Bibimbap",
    image: ChickenBibimbap,
    price: 12.99,
    description: "Warm rice topped with grilled chicken, vegetables, egg, and spicy sauce.",
    category: "Rice Bowls",
  },
  {
    _id: "13",
    name: "Kimchi Fried Rice",
    image: KimchiFriedRice,
    price: 10.49,
    description: "Stir-fried rice with fermented cabbage, vegetables, egg, and savory seasoning.",
    category: "Rice Bowls",
  },

  // Noodles
  {
    _id: "14",
    name: "Beef Japchae",
    image: BeefJapchae,
    price: 12.99,
    description: "Stir-fried glass noodles with tender halal beef and colorful vegetables.",
    category: "Noodles",
  },
  {
    _id: "15",
    name: "Jajangmyeon",
    image: Jajangmyeon,
    price: 11.49,
    description: "Soft noodles topped with a rich black bean sauce and vegetables.",
    category: "Noodles",
  },
  {
    _id: "16",
    name: "Spicy Ramyeon",
    image: SpicyRamyeon,
    price: 9.99,
    description: "Hot noodle soup with vegetables, egg, and a bold spicy broth.",
    category: "Noodles",
  },
  {
    _id: "17",
    name: "Bibim Guksu",
    image: BibimGuksu,
    price: 10.99,
    description: "Cold noodles mixed with fresh vegetables and a spicy tangy sauce.",
    category: "Noodles",
  },

  // Soups & Stews
  {
    _id: "18",
    name: "Kimchi Jjigae",
    image: KimchiJjigae,
    price: 11.99,
    description: "Warm spicy stew with fermented cabbage,  and vegetables.",
    category: "Soups & Stews",
  },
  {
    _id: "19",
    name: "Sundubu Jjigae",
    image: SundubuJjigae,
    price: 11.99,
    description: "Spicy soft tofu stew with vegetables.",
    category: "Soups & Stews",
  },
  {
    _id: "20",
    name: "Beef Galbitang",
    image: BeefGalbitang,
    price: 15.99,
    description: "Clear comforting soup with tender halal beef ribs, vegetables, and rice.",
    category: "Soups & Stews",
  },
  {
    _id: "21",
    name: "Chicken Soup",
    image: ChickenSoup,
    price: 12.99,
    description: "Comforting chicken soup with vegetables, rice, and a light flavorful broth.",
    category: "Soups & Stews",
  },

  // Side Dishes
  {
    _id: "22",
    name: "Kimchi",
    image: Kimchi,
    price: 3.49,
    description: "Fermented cabbage with a bold, tangy, and mildly spicy flavor.",
    category: "Side Dishes",
  },
  {
    _id: "23",
    name: "Pickled Radish",
    image: PickledRadish,
    price: 2.99,
    description: "Crunchy radish slices with a sweet and tangy flavor.",
    category: "Side Dishes",
  },
  {
    _id: "24",
    name: "Potato Salad",
    image: PotatoSalad,
    price: 3.99,
    description: "Creamy potato salad with vegetables and a light sweet dressing.",
    category: "Side Dishes",
  },
  {
    _id: "25",
    name: "Steamed Rice",
    image: SteamedRice,
    price: 2.49,
    description: "Freshly steamed white rice, perfect with grilled dishes and stews.",
    category: "Side Dishes",
  },
  {
    _id: "26",
    name: "Seaweed Sheets",
    image: SeaweedSheets,
    price: 2.99,
    description: "Lightly salted roasted seaweed sheets with a crisp texture.",
    category: "Side Dishes",
  },

  // Desserts
  {
    _id: "27",
    name: "Mango Bingsu",
    image: MangoBingsu,
    price: 8.99,
    description: "Fine shaved ice topped with sweet mango and creamy condensed milk.",
    category: "Desserts",
  },
  {
    _id: "28",
    name: "Strawberry Bingsu",
    image: StrawberryBingsu,
    price: 8.99,
    description: "Fine shaved ice topped with fresh strawberries and creamy condensed milk.",
    category: "Desserts",
  },
  {
    _id: "29",
    name: "Sweet Pancake",
    image: SweetPancake,
    price: 5.49,
    description: "Warm soft pancake filled with brown sugar, cinnamon, and nuts.",
    category: "Desserts",
  },
  {
    _id: "30",
    name: "Rice Cakes",
    image: RiceCakes,
    price: 4.99,
    description: "Soft chewy sweet rice cakes with a delicate and light flavor.",
    category: "Desserts",
  },
  {
    _id: "31",
    name: "Mochi Ice Cream",
    image: MochiIceCream,
    price: 5.99,
    description: "Chewy rice dough filled with smooth and creamy ice cream.",
    category: "Desserts",
  },
];