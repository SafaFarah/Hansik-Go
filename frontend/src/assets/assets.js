import logo from './images/logo.svg'
import menu1 from './images/menu1.png'
import menu2 from './images/menu2.png'
import menu3 from './images/menu3.png'
import menu4 from './images/menu4.png'
import menu5 from './images/menu5.png'
import menu6 from './images/menu6.png'
import menu7 from './images/menu7.jpg'
import menu8 from './images/menu8.jpg'
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
import Sikhye from './images/Sikhye.png'
import BoriCha from './images/BoriCha.jpg'
import YujaCha from './images/YujaCha.jpg'
import OmijaCha from './images/OmijaCha.jpg'
import BananaMilk from './images/BananaMilk.jpg'
import appStore from './images/appStore.svg'
import playStore from './images/playStore.svg'


export const assets = {
    logo,
    appStore,
    playStore
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
    },
    {
        id: "Drinks",
        menu_name: "Drinks",
        menu_image: menu8
    }
]

export const food_list = [
  // Appetizers
  {
    _id: "1",
    name: "Spicy Tteokbokki",
    image: Tteokbokki,
    priceCent: 699,
    description: "Chewy rice cakes in a rich, mildly spicy red pepper sauce.",
    category: "Appetizers",
  },
  {
    _id: "2",
    name: "Beef Mandu",
    image: BeefMandu,
    priceCent: 799,
    description: "Pan-fried dumplings filled with seasoned halal beef and vegetables.",
    category: "Appetizers",
  },
  {
    _id: "3",
    name: "Chicken Mandu",
    image: ChickenMandu,
    priceCent: 749,
    description: "Pan-fried dumplings filled with seasoned chicken and vegetables.",
    category: "Appetizers",
  },
  {
    _id: "4",
    name: "Vegetable Pancake",
    image: VegetablePancake,
    priceCent: 699,
    description: "Crispy savory pancake made with fresh mixed vegetables.",
    category: "Appetizers",
  },
  {
    _id: "5",
    name: "Beef Kimbap",
    image: BeefKimbap,
    priceCent: 849,
    description: "Seaweed rice rolls filled with halal beef, egg, and fresh vegetables.",
    category: "Appetizers",
  },

  // BBQ & Grills
  {
    _id: "6",
    name: "Beef Bulgogi",
    image: BeefBulgogi,
    priceCent: 1499,
    description: "Thin slices of tender marinated halal beef, grilled with sweet savory sauce.",
    category: "BBQ & Grills",
  },
  {
    _id: "7",
    name: "Spicy Beef Bulgogi",
    image: SpicyBeefBulgogi,
    priceCent: 1549,
    description: "Tender marinated halal beef grilled in a rich and spicy sauce.",
    category: "BBQ & Grills",
  },
  {
    _id: "8",
    name: "Chicken Bulgogi",
    image: ChickenBulgogi,
    priceCent: 1299,
    description: "Tender marinated chicken grilled with a sweet and savory sauce.",
    category: "BBQ & Grills",
  },
  {
    _id: "9",
    name: "Beef Galbi",
    image: BeefGalbi,
    priceCent: 1899,
    description: "Slow-marinated halal beef short ribs grilled until tender and flavorful.",
    category: "BBQ & Grills",
  },
  {
    _id: "10",
    name: "BBQ Chicken",
    image: BBQChicken,
    priceCent: 1349,
    description: "Grilled chicken coated in a smoky, sweet, and lightly spicy barbecue sauce.",
    category: "BBQ & Grills",
  },

  // Rice Bowls
  {
    _id: "11",
    name: "Beef Bibimbap",
    image: BeefBibimbap,
    priceCent: 1399,
    description: "Warm rice topped with marinated beef, vegetables, egg, and spicy sauce.",
    category: "Rice Bowls",
  },
  {
    _id: "12",
    name: "Chicken Bibimbap",
    image: ChickenBibimbap,
    priceCent: 1299,
    description: "Warm rice topped with grilled chicken, vegetables, egg, and spicy sauce.",
    category: "Rice Bowls",
  },
  {
    _id: "13",
    name: "Kimchi Fried Rice",
    image: KimchiFriedRice,
    priceCent: 1049,
    description: "Stir-fried rice with fermented cabbage, vegetables, egg, and savory seasoning.",
    category: "Rice Bowls",
  },

  // Noodles
  {
    _id: "14",
    name: "Beef Japchae",
    image: BeefJapchae,
    priceCent: 1299,
    description: "Stir-fried glass noodles with tender halal beef and colorful vegetables.",
    category: "Noodles",
  },
  {
    _id: "15",
    name: "Jajangmyeon",
    image: Jajangmyeon,
    priceCent: 1149,
    description: "Soft noodles topped with a rich black bean sauce and vegetables.",
    category: "Noodles",
  },
  {
    _id: "16",
    name: "Spicy Ramyeon",
    image: SpicyRamyeon,
    priceCent: 999,
    description: "Hot noodle soup with vegetables, egg, and a bold spicy broth.",
    category: "Noodles",
  },
  {
    _id: "17",
    name: "Bibim Guksu",
    image: BibimGuksu,
    priceCent: 1099,
    description: "Cold noodles mixed with fresh vegetables and a spicy tangy sauce.",
    category: "Noodles",
  },

  // Soups & Stews
  {
    _id: "18",
    name: "Kimchi Jjigae",
    image: KimchiJjigae,
    priceCent: 1199,
    description: "Warm spicy stew with fermented cabbage,  and vegetables.",
    category: "Soups & Stews",
  },
  {
    _id: "19",
    name: "Sundubu Jjigae",
    image: SundubuJjigae,
    priceCent: 1199,
    description: "Spicy soft tofu stew with vegetables.",
    category: "Soups & Stews",
  },
  {
    _id: "20",
    name: "Beef Galbitang",
    image: BeefGalbitang,
    priceCent: 1599,
    description: "Clear comforting soup with tender halal beef ribs, vegetables, and rice.",
    category: "Soups & Stews",
  },
  {
    _id: "21",
    name: "Chicken Soup",
    image: ChickenSoup,
    priceCent: 1299,
    description: "Comforting chicken soup with vegetables, rice, and a light flavorful broth.",
    category: "Soups & Stews",
  },

  // Side Dishes
  {
    _id: "22",
    name: "Kimchi",
    image: Kimchi,
    priceCent: 349,
    description: "Fermented cabbage with a bold, tangy, and mildly spicy flavor.",
    category: "Side Dishes",
  },
  {
    _id: "23",
    name: "Pickled Radish",
    image: PickledRadish,
    priceCent: 299,
    description: "Crunchy radish slices with a sweet and tangy flavor.",
    category: "Side Dishes",
  },
  {
    _id: "24",
    name: "Potato Salad",
    image: PotatoSalad,
    priceCent: 399,
    description: "Creamy potato salad with vegetables and a light sweet dressing.",
    category: "Side Dishes",
  },
  {
    _id: "25",
    name: "Steamed Rice",
    image: SteamedRice,
    priceCent: 249,
    description: "Freshly steamed white rice, perfect with grilled dishes and stews.",
    category: "Side Dishes",
  },
  {
    _id: "26",
    name: "Seaweed Sheets",
    image: SeaweedSheets,
    priceCent: 299,
    description: "Lightly salted roasted seaweed sheets with a crisp texture.",
    category: "Side Dishes",
  },

  // Desserts
  {
    _id: "27",
    name: "Mango Bingsu",
    image: MangoBingsu,
    priceCent: 899,
    description: "Fine shaved ice topped with sweet mango and creamy condensed milk.",
    category: "Desserts",
  },
  {
    _id: "28",
    name: "Strawberry Bingsu",
    image: StrawberryBingsu,
    priceCent: 899,
    description: "Fine shaved ice topped with fresh strawberries and creamy condensed milk.",
    category: "Desserts",
  },
  {
    _id: "29",
    name: "Sweet Pancake",
    image: SweetPancake,
    priceCent: 549,
    description: "Warm soft pancake filled with brown sugar, cinnamon, and nuts.",
    category: "Desserts",
  },
  {
    _id: "30",
    name: "Rice Cakes",
    image: RiceCakes,
    priceCent: 499,
    description: "Soft chewy sweet rice cakes with a delicate and light flavor.",
    category: "Desserts",
  },
  {
    _id: "31",
    name: "Mochi Ice Cream",
    image: MochiIceCream,
    priceCent: 599,
    description: "Chewy rice dough filled with smooth and creamy ice cream.",
    category: "Desserts",
  },
  // Drinks
{
  _id: "32",
  name: "Sikhye",
  image: Sikhye,
  price: 3.99,
  description: "A traditional sweet Korean rice drink served chilled.",
  category: "Drinks",
},
{
  _id: "33",
  name: "Bori-cha",
  image: BoriCha,
  price: 2.99,
  description: "A refreshing roasted barley tea traditionally served hot or cold.",
  category: "Drinks",
},
{
  _id: "34",
  name: "Yuja-cha",
  image: YujaCha,
  price: 3.49,
  description: "A sweet citrus tea made with Korean yuja marmalade and hot water.",
  category: "Drinks",
},
{
  _id: "35",
  name: "Omija-cha",
  image: OmijaCha,
  price: 3.99,
  description: "A refreshing tea made from five-flavor berries with a sweet and tangy taste.",
  category: "Drinks",
},
{
  _id: "36",
  name: "Banana Milk",
  image: BananaMilk,
  price: 2.49,
  description: "A creamy and sweet Korean banana-flavored milk drink.",
  category: "Drinks",
}
];