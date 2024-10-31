
import Home from "../Components/Home/index.jsx";
import Order from "../Components/Order/index.jsx";
import Category from "../Components/Category/index.jsx";
import Product from "../Components/Product/index.jsx";
const publicRoute = [
  { path: '/', component: Home },
  { path: '/Order', component: Order },
  { path: '/Category', component: Category },
  { path: '/Product', component: Product },//,layout: null
];

const privateRoute = [];

export { publicRoute, privateRoute };