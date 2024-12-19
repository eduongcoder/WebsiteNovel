import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNovels } from '@/Redux/ReduxSlice/novelSlice';
import { fetchCategories } from '@/Redux/ReduxSlice/categorySlice';
import { Link } from 'react-router-dom';
function PagesCategory() {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.category); // Danh sách thể loại
    const { novels } = useSelector((state) => state.novel); // Danh sách tiểu thuyết
    const [selectedCategory, setSelectedCategory] = useState(null); // Thể loại được chọn

    useEffect(() => {
        // Lấy dữ liệu thể loại và tiểu thuyết
        dispatch(fetchCategories());
        dispatch(fetchNovels());
    }, [dispatch]);

    // Lọc tiểu thuyết theo thể loại
    const filteredNovels = selectedCategory
        ? novels.filter((novel) =>
              novel.categories?.some(
                  (cat) => cat.idCategory === selectedCategory,
              ),
          )
        : novels;

    return (
        <div className="bg-gradient-to-r from-sky-500 to-indigo-500 mb-4 border-gray-200 dark:bg-gray-900 mx-auto  h-[1280px] max-w-[1280px] flex-1 py-0 px-8 md:px-24">
            {/* Bộ lọc thể loại */}
            <div className="flex flex-wrap gap-2 mb-4">
                <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 my-2 py-2 rounded-md text-white ${
                        selectedCategory === null
                            ? 'bg-blue-600'
                            : 'bg-gray-400'
                    }`}
                >
                    All
                </button>
                {categories.map((category) => (
                    <button
                        key={category.idCategory}
                        onClick={() => setSelectedCategory(category.idCategory)}
                        className={`my-2 px-4 py-2 rounded-md text-white ${
                            selectedCategory === category.idCategory
                                ? 'bg-blue-600'
                                : 'bg-gray-400'
                        }`}
                    >
                        {category.nameCategory}
                    </button>
                ))}
            </div>

            {/* Danh sách tiểu thuyết */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredNovels.map((novel) => (
                      <Link to={`/Customer/:${novel.idNovel}`} className="w-full">
                    <div
                        key={novel.idNovel}
                        className="bg-gray-800 text-white p-4 rounded-lg shadow-md"
                    >
                        <img
                            src={novel.imageNovel}
                            alt={novel.nameNovel}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h2 className="text-lg font-bold mb-2">
                            {novel.nameNovel}
                        </h2>
                        <p className="text-sm text-gray-400 mb-2">
                            {novel.descriptionNovel}
                        </p>
                        <p
                            className={`text-sm font-bold ${
                                novel.statusNovel === 'COMPLETED'
                                    ? 'text-green-500'
                                    : 'text-yellow-500'
                            }`}
                        >
                            {novel.statusNovel === 'COMPLETED'
                                ? 'Completed'
                                : 'Ongoing'}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {novel.categories?.map((cat) => (
                                <span
                                    key={cat.idCategory}
                                    className="bg-gray-600 px-2 py-1 rounded-full text-sm"
                                >
                                    {cat.nameCategory}
                                </span>
                            )) || (
                                <span className="text-gray-400 text-sm italic">
                                    No categories
                                </span>
                            )}
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default PagesCategory;
