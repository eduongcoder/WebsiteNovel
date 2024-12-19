import InputComment from '../Comment/inputComment/InCo';
import ViewComponent from './ViewComment/ViCo';
export const Comment =  ({idChapter}) => {
    return ( 
        <div className=" mb-4 border-gray-200 dark:bg-gray-900 mx-auto  h-full max-w-[1280px] flex-1 py-0 px-8 md:px-24" >
          <InputComment idChapter={idChapter} />
          <ViewComponent idChapter={idChapter} />
        </div>
     );
}

export default Comment;