import React from 'react';
import ReviewList from './ReviewList';
function NovelDetails() {
    return (
        <section className="bg-gray-900 text-white p-6 rounded-md">
            {/* Thông tin tổng quát */}
            <div className="flex justify-between border-b border-gray-700 pb-4">
                <div>
                    <h2 className="text-lg font-semibold">Chapters</h2>
                    <p className="text-sm text-gray-300">2822 Chapters</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Licensed From</h2>
                    <p className="text-sm text-gray-300">Zongheng</p>
                </div>
            </div>

            {/* Thể loại */}
            <div className="flex flex-wrap gap-2 mt-4">
                {[
                    'Chinese',
                    'Fantasy',
                    'Comedy',
                    'Mystery',
                    'Xuanhuan',
                    'Action',
                    'Crafting',
                ].map((tag) => (
                    <span
                        key={tag}
                        className="px-3 py-1 text-sm font-medium bg-gray-700 rounded-full hover:bg-gray-600"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Chi tiết */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Details</h3>
                <p className="text-sm text-gray-300 mb-4">
                    Schedule: 14 chapters a week
                </p>
                <p className="text-sm text-gray-300">
                    Yang Ye's entire family relied on him to keep them safe, but
                    just when everything seemed to be going well, misfortune
                    struck in droves!
                </p>
                <p className="text-sm text-gray-300 mt-2">
                    How will he overcome the odds and rise up to protect his
                    loved ones?
                </p>
            </div>
            <div assName="mt-6">
                <ReviewList />
            </div>
        </section>
    );
}

export default NovelDetails;
