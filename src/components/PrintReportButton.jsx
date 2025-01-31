import React from 'react';
import html2pdf from 'html2pdf.js';
import { motion } from 'framer-motion';
import { FileDown } from 'lucide-react';

const PrintReportButton = ({ reports, userData }) => {
  const getReportTemplate = () => `
    <div class="print-only" style="padding: 40px; max-width: 850px; margin: 0 auto; font-family: 'Segoe UI', sans-serif;">
      <!-- Title Section with 3D effect -->
      <div style="
        background: linear-gradient(135deg, #22c55e, #15803d);
        padding: 4px;
        border-radius: 16px;
        box-shadow: 0 10px 30px -5px rgba(34, 197, 94, 0.3);
        margin-bottom: 40px;
        transform: perspective(1000px) rotateX(2deg);
      ">
        <div style="
          background: white;
          border-radius: 14px;
          padding: 25px;
          text-align: center;
          position: relative;
        ">
          <h2 style="
            font-size: 36px;
            background: linear-gradient(45deg, #22c55e, #15803d);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 0;
            font-weight: 800;
            letter-spacing: -1px;
            text-transform: uppercase;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
          ">
            MetroniQ Report Details
          </h2>
        </div>
      </div>

      <!-- Data Table with 3D effect -->
      <div style="
        background: white;
        border-radius: 16px;
        box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
        overflow: hidden;
        transform: perspective(1000px) rotateX(1deg);
      ">
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: linear-gradient(90deg, #22c55e, #15803d);">
              <th style="padding: 16px; color: white; font-weight: 600; text-align: left; text-transform: uppercase; letter-spacing: 1px; font-size: 14px;">Users</th>
              <th style="padding: 16px; color: white; font-weight: 600; text-align: left; text-transform: uppercase; letter-spacing: 1px; font-size: 14px;">Address</th>
              <th style="padding: 16px; color: white; font-weight: 600; text-align: left; text-transform: uppercase; letter-spacing: 1px; font-size: 14px;">Date</th>
              <th style="padding: 16px; color: white; font-weight: 600; text-align: left; text-transform: uppercase; letter-spacing: 1px; font-size: 14px;">Reason</th>
            </tr>
          </thead>
          <tbody>
            ${reports.map((report) => `
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 16px; color: #1a73e8; font-weight: 500;">${userData.name || ''}</td>
                <td style="padding: 16px; color: #4a5568;">${userData.address || ''}</td>
                <td style="padding: 16px; color: #4a5568;">${report.date || ''}</td>
                <td style="padding: 16px; color: #4a5568;">${report.reason || ''}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-full blur opacity-75 animate-pulse" />
      <motion.button
        whileHover={{ 
          scale: 1.1,
          rotate: 5,
          boxShadow: "0 0 25px rgb(52 211 153 / 0.5)"
        }}
        whileTap={{ 
          scale: 0.9,
          rotate: -5 
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        onClick={() => {
          const opt = {
            margin: 1,
            filename: 'MetroniQ_Report.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
          };
          const content = document.createElement('div');
          content.innerHTML = getReportTemplate();
          html2pdf().from(content).set(opt).save();
        }}
        className="relative p-4 rounded-full bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 text-white shadow-xl"
      >
        <FileDown size={24} className="relative z-10 transform transition-transform hover:rotate-12" />
      </motion.button>
    </div>
  );
};

export default PrintReportButton;