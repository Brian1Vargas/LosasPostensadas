import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';

const PdfViewer = ({ pdfUrl, onClose }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const zoomPluginInstance = zoomPlugin();

    return (
        <div style={{ position: 'relative', height: '750px', width: '100%' }}>
            <button 
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: '1px',
                    right: '250px',
                    zIndex: 1000,
                    backgroundColor: '#f00',
                    color: '#fff',
                    border: 'none',
                    padding: '10px',
                    cursor: 'pointer'
                }}
            >
                Cerrar
            </button>
            <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`}>
                <Viewer 
                    fileUrl={pdfUrl} 
                    plugins={[defaultLayoutPluginInstance, zoomPluginInstance]} 
                    defaultScale={1} // Ajusta el valor de zoom predeterminado aquí
                />
            </Worker>
        </div>
    );
};

export default PdfViewer;
