import InputCategory from "./InputCategory";
import ListViewCategory from "./ListViewCategory";
import { createCategory, updateCategory, fetchCategories,deleteCategory } from '@/Redux/ReduxSlice/categorySlice';
function Category() {
    return ( <div>
        <InputCategory
            createCategoryAction={createCategory}
            updateCategoryAction={updateCategory}
            fetchCategoriesAction={fetchCategories}
        />
        <ListViewCategory />
    </div> );
}

export default Category;