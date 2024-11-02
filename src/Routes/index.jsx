import Home from '../Components/Home/index.jsx';
import Order from '../Components/Order/index.jsx';
import Category from '../Components/Category/index.jsx';
import Product from '../Components/Product/index.jsx';
import Chapter from '../Components/Chapter/index.jsx';
import Authors from '@/Components/Authors/index.jsx';
import PointOfViews from '@/Components/PointOfViews/index.jsx';

const publicRoute = [
    { path: '/', component: Home },
    { path: '/Order', component: Order },
    { path: '/Category', component: Category },
    { path: '/Product', component: Product }, //,layout: null
    { path: '/Chapter', component: Chapter },
    { path: '/Authors', component: Authors },
    { path: '/PointOfViews', component: PointOfViews },  //,layout: null
];

const privateRoute = [];

export { publicRoute, privateRoute };
