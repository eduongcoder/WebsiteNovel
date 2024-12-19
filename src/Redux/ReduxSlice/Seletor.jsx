export const chapter = (state) => state.chapter.chapters;
export const novel = (state) => state.novel.novels;
export const Category = (state) => state.category.categories; //categorys
export const author = (state) => state.author.author;
export const pov = (state) => state.pov.povs;
export const comment = (state) => state.comment.comments;
export const commentNovel = (state) => state.comment.commentsNovels;
export const userLogin = (state) => state.user.userr;
export const userr = (state) => state.user.users;
export const userlocal = (state) => state.user.user;
export const temp = JSON.parse(localStorage.getItem('user'))?.result || null;
export const history = (state) => state.user.historys;
