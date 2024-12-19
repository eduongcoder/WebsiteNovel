import Navbar from '@/Layout/DefaultLayout/navbar';
import NovelCard from '../IntroNovel/introNovel';
import TabNOvel from './TabNovel';
import FooterUser from './footerUser';

function PageNovel({ idNovel }) {
    return (
        <div className='bg-gradient-to-r from-cyan-500 to-blue-500'>
            <Navbar />
            <div className="sm2:px-40 px-24 mx-auto max-w-[1280px]  pb-40  sm:pb-80 ">
                <NovelCard idNovel={idNovel} />
                <TabNOvel idNovel={idNovel} />{' '}
                {/* Truyền idNovel xuống TabNOvel */}
            </div>
            <FooterUser />
        </div>
    );
}

export default PageNovel;
