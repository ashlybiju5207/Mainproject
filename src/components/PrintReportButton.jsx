import React, { useState } from 'react';
import { Printer, FileText, X } from 'lucide-react'; // Use Printer and FileText icons
import html2pdf from 'html2pdf.js';

const PrintReportButton = ({ contentId }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [saving, setSaving] = useState(false);

  const handlePrint = async (format) => {
    setShowDialog(false);
    setSaving(true);
    
    try {
      const element = document.getElementById(contentId);
      if (format === 'pdf') {
        html2pdf().from(element).save();
      } else {
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print</title></head><body>');
        printWindow.document.write(element.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
      }
    } catch (error) {
      console.error('Error printing:', error);
      alert('Error generating document. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowDialog(true)}
        className="fixed bottom-4 right-4 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <Printer size={24} />
      </button>
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative w-96">
            <button onClick={() => setShowDialog(false)} className="absolute top-2 right-2">
              <X size={16} />
            </button>
            <h3 className="text-lg font-semibold mb-4 text-green-500">Choose Format</h3>
            <button onClick={() => handlePrint('pdf')} className="w-full p-2 bg-green-500 text-white rounded mb-2 flex items-center justify-center hover:bg-green-600">
              <FileText size={16} className="mr-2" /> PDF
            </button>
            <button onClick={() => handlePrint('print')} className="w-full p-2 bg-green-500 text-white rounded flex items-center justify-center hover:bg-green-600">
              <Printer size={16} className="mr-2" /> Print
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintReportButton;