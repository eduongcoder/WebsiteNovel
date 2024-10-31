const data = [
    {
        id: 1,
        name: 'Jeans',
        percentValues: 70,
    },
    { id: 2, name: 'Shirts', percentValues: 40 },
    {
        id: 3,
        name: 'Belts',
        percentValues: 60,
    },
    { id: 4, name: 'Caps', percentValues: 80 },
    { id: 5, name: 'Others', percentValues: 20 },
];
function APChart() {
    return (
        <div className="p-4 md:p-3 rounded-md  shadow-black bg-slate-50 ">
            <div className="flex items-center justify-between gap-x-1.5 mb-2">
                <h4 className="text-xl mb-4	font-bold text-blue-500">Most Sold Items</h4>
            </div>
            <div className="grid gap-y-5">
                {data?.map((progressbar) => (
                    <div className="progress-bar-item" key={progressbar.id}>
                        <div className="bar-item-info">
                            <p className="font-semibold text-yellow-800">
                                {progressbar.name}
                            </p>
                            <p className="font-semibold text-blue-800">
                                {progressbar.percentValues}
                            </p>
                        </div>
                        <div className="w-full h-[10px] rounded-100vh bg-slate-300 relative">
                            <div
                                className="absolute h-full w-0 inset-x-0 inset-y-0 bg-sky-700 rounded-100vh "
                                style={{
                                    width: `${progressbar.percentValues}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default APChart;
