import Home from '../Components/Home/index.jsx';
import Order from '../Components/PagesHomeUser/index.jsx';
import Category from '../Components/Category/index.jsx';
import Product from '../Components/Novel/index.jsx';
import Chapter from '../Components/Chapter/index.jsx';
import Authors from '@/Components/Authors/index.jsx';
import PointOfViews from '@/Components/PointOfViews/index.jsx';
import ViewChap from '@/Components/ViewChap/index.jsx';
import Customer from '@/Components/PagesNovel/index.jsx';
const publicRoute = [
    { path: '/', component: Home },
    { path: '/Order', component: Order ,layout: null },
    { path: '/Category', component: Category },
    { path: '/Product', component: Product }, //,layout: null
    { path: '/Chapter', component: Chapter },
    { path: '/Authors', component: Authors },
    { path: '/PointOfViews', component: PointOfViews },  //,layout: null
    { path: '/ViewChap/:idChapter', component: ViewChap ,layout: null },
    { path: '/Customer/:idNovel', component: Customer, layout: null },
];

const privateRoute = [];

export { publicRoute, privateRoute };
