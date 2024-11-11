function regiter() {
    return ( <div><section
        className="w-full text-gray-900 py-36 bg-center bg-cover bg-no-repeat"
        style={{
            backgroundImage:
                "url('https://images.unsplash.com/photo-1623479322729-28b25c16b011?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=1280')",
        }}
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 flex items-center justify-center">
            <div className="lg:w-3/6 lg:pr-0 pr-0">
                <h1 className="font-medium text-5xl text-white">
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                </h1>
                <p className="leading-relaxed mt-4 text-white">
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua.
                </p>
            </div>
            <div className="lg:w-3/6 xl:w-2/5 md:w-full bg-gray-50 p-8 flex flex-col lg:ml-auto w-full mt-10 lg:mt-0 rounded-md">
                <div className="relative mb-4">
                    <label
                        htmlFor="full-name"
                        className="leading-7 text-sm text-gray-600"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full bg-white rounded-md border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-150 ease-in-out"
                    />
                </div>
                <div className="relative mb-4">
                    <label
                        htmlFor="email"
                        className="leading-7 text-sm text-gray-600"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full bg-white rounded-md border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-150 ease-in-out"
                    />
                </div>
                <div className="relative mb-4">
                    <label
                        htmlFor="phone"
                        className="leading-7 text-sm text-gray-600"
                    >
                        Phone
                    </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="w-full bg-white rounded-md border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-150 ease-in-out"
                    />
                </div>
                <div className="relative mb-4">
                    <label
                        htmlFor="message"
                        className="leading-7 text-sm text-gray-600"
                    >
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        className="w-full bg-white rounded-md border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-150 ease-in-out"
                    ></textarea>
                </div>
                <button className="text-white bg-indigo-500 rounded-md border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 text-lg">
                    Submit
                </button>
            </div>
        </div>
    </section></div>  );
}

export default regiter;