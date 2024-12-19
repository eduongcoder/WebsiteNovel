import Home from '../Components/Home/index.jsx';
import Order from '../Components/PagesHomeUser/index.jsx';
import Category from '../Components/Category/index.jsx';
import Product from '../Components/Novel/index.jsx';
import Chapter from '../Components/Chapter/index.jsx';
import Authors from '@/Components/Authors/index.jsx';
import PointOfViews from '@/Components/PointOfViews/index.jsx';
import ViewChap from '@/Components/ViewChap/index.jsx';
import Customer from '@/Components/PagesNovel/index.jsx';
import textAll from '@/Components/TestLayoutJSX/textAll.jsx';
import AreaCategory from '@/Components/PagesCategory/AreaCategory.jsx';
const publicRoute = [
    { path: '/', component: Product },
    { path: '/Order', component: Order ,layout: null },
    { path: '/Category', component: Category },
    { path: '/Product', component: Product }, //,layout: null
    { path: '/Chapter', component: Chapter },
    { path: '/Authors', component: Authors },
    { path: '/PointOfViews', component: PointOfViews },  //,layout: null
    { path: '/ViewChap/:idChapter', component: ViewChap ,layout: null },
    { path: '/Customer/:idNovel', component: Customer, layout: null },
    { path: '/textAll', component: textAll }, //,layout: null },
 //   { path: '/dashboard', component: Dashboard, layout: null },
    { path: '/AreaCategory', component: AreaCategory ,layout: null },
];

const privateRoute = [];

export { publicRoute, privateRoute };
