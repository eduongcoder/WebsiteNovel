import Navbar from '@/Layout/DefaultLayout/navbar';
import NovelCard from '../IntroNovel/introNovel';
import TabNOvel from './TabNovel';
import FooterUser from './footerUser';

function PageNovel({ idNovel }) {
    return (
        <div>
            <Navbar />
            <div className="sm2:px-40 px-24 mx-auto max-w-[1280px] pt-16 pb-40 sm:pt-36 sm:pb-80">
                {console.log(idNovel)}
                <NovelCard idNovel={idNovel} />
                <TabNOvel   idNovel={idNovel} /> {/* Truyền idNovel xuống TabNOvel */}
            </div>
            <FooterUser />
        </div>
    );
}

export default PageNovel;
