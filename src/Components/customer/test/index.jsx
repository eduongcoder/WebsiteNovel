import React, { useState } from "react";

 function AccordionUsage() {
  const [open, setOpen] = useState(null);

  const toggleAccordion = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <div>
      {/* Accordion 1 */}
      <div className="border border-gray-200 rounded-md">
        <button
          className="w-full text-left p-4 flex justify-between items-center bg-gray-100"
          onClick={() => toggleAccordion(1)}
        >
          <span>Accordion 1</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              open === 1 ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {open === 1 && (
          <div className="p-4 bg-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </div>
        )}
      </div>

      {/* Accordion 2 */}
      <div className="border border-gray-200 rounded-md mt-2">
        <button
          className="w-full text-left p-4 flex justify-between items-center bg-gray-100"
          onClick={() => toggleAccordion(2)}
        >
          <span>Accordion 2</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              open === 2 ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {open === 2 && (
          <div className="p-4 bg-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </div>
        )}
      </div>

      {/* Accordion with Actions */}
      <div className="border border-gray-200 rounded-md mt-2">
        <button
          className="w-full text-left p-4 flex justify-between items-center bg-gray-100"
          onClick={() => toggleAccordion(3)}
        >
          <span>Accordion Actions</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              open === 3 ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {open === 3 && (
          <div className="p-4 bg-white">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </p>
            <div className="flex justify-end space-x-2 mt-4">
              <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Agree
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccordionUsage;
