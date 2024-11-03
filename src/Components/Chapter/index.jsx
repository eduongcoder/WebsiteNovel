import ChapForm from './InputChap';
import getAllChapters from './InputChap/index2';
import ListViewChap from './ListViewChap';
function Chapter() {
    return (
        <div>
            <ChapForm />
            <ListViewChap />
            {/* //<getAllChapters /> */}
        </div>
    );
}

export default Chapter;
