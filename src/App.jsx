import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

// Text layer for React-PDF.
import 'react-pdf/dist/Page/TextLayer.css';

// Importing the PDF.js worker.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const App = () => {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
	};

	const goToPrevPage = () =>
		setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

	const goToNextPage = () =>
		setPageNumber(
			pageNumber + 1 >= numPages ? numPages : pageNumber + 1,
		);

	return (
		<div className="page">
    <nav>
      <button onClick={goToPrevPage} className="previous">Prev</button>
      <button onClick={goToNextPage} className="next">Next</button>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </nav>

			<Document
				file="pspdfkit-web-demo.pdf"
				onLoadSuccess={onDocumentLoadSuccess}
			>
				<Page pageNumber={pageNumber} />
			</Document>
		</div>
	);
};

export default App;