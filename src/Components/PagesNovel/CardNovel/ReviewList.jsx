import React from 'react';

function ReviewCard({ review }) {
    return (
        <div className="bg-gray-800 text-white p-4 mb-4 rounded-lg shadow-md">
            {/* Header */}
            <div className="flex items-center mb-2">
                <img src={review.avatar} alt="avatar" className="w-10 h-10 rounded-full mr-3" />
                <div>
                    <p className="font-semibold">{review.username}</p>
                    <p className="text-sm text-gray-400">{review.time}</p>
                </div>
            </div>

            {/* Review Content */}
            <div className="text-sm text-gray-300 mb-2">
                {review.content}
            </div>

            {/* Footer with likes, dislikes and comments */}
            <div className="flex justify-between text-gray-400 text-xs">
                <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 9l2.5 2.5L14 14M4 12h16M14 5l2.5 2.5L14 10" /></svg>
                        <span>{review.likes}</span>
                    </span>
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2.5 2.5L10 19M20 12H4M10 5l2.5 2.5L10 10" /></svg>
                        <span>{review.dislikes}</span>
                    </span>
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v20M6 6l6 6 6-6" /></svg>
                        <span>{review.comments}</span>
                    </span>
                </div>
                <span className="text-blue-500">Show more</span>
            </div>
        </div>
    );
}

function ReviewList() {
    const reviews = [
        {
            username: 'godatom',
            avatar: 'https://via.placeholder.com/150',
            time: '5 years ago',
            content: 'Another novel translated by InVader. Personally, I\'ve always been a sucker for sword cultivation novels, and this one is pretty decent as far as those go....',
            likes: 158,
            dislikes: 102,
            comments: 12
        },
        {
            username: 'Mister fuzz',
            avatar: 'https://via.placeholder.com/150',
            time: '5 years ago - Edited',
            content: 'After finishing the raws, I have to say this is a solid C+/B- read. The MC is kind of a psycho (which is actually important to the story in itself) but he eventually mellows out a bit towards the end...',
            likes: 108,
            dislikes: 59,
            comments: 6
        },
        {
            username: 'sblego11',
            avatar: 'https://via.placeholder.com/150',
            time: '5 years ago - Edited',
            content: 'EDIT: If you are unsure about reading this novel, I\'d recommend giving it a go for at least the first hundred or two hundred chapters. Yes I did drop this novel, but it was a very close thing...',
            likes: 140,
            dislikes: 77,
            comments: 7
        }
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Reviews</h2>
                <div className="text-xs text-gray-400">53% | 120 Reviews</div>
            </div>
            {reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
            ))}
        </div>
    );
}

export default ReviewList;
