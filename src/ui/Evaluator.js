import '../util/App.css';
import React, { useState } from 'react';


function Evaluator() {
    const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));

  return (
    <div className="p-4">
      {currentPage === 1 && <Page1 nextPage={nextPage} />}
      {currentPage === 2 && <Page2 nextPage={nextPage} prevPage={prevPage} />}
      {currentPage === 3 && <Page3 prevPage={prevPage} />}

      <div className="mt-4">
        <button onClick={prevPage} disabled={currentPage === 1} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded">
          Back
        </button>
        <button onClick={nextPage} disabled={currentPage === 3} className="bg-blue-500 text-white px-4 py-2 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

const Page1 = ({ nextPage }) => (
  <div>
    <h1>Page 1</h1>
  </div>
);

const Page2 = ({ nextPage, prevPage }) => (
  <div>
    <h1>Page 2</h1>
  </div>
);

const Page3 = ({ prevPage }) => (
  <div>
    <h1>Page 3</h1>
  </div>
);


export default Evaluator;