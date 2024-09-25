import { useRef } from 'react';
import { Box, Card, Button } from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import  PropTypes from "prop-types";
import Resume1 from './Resume1';
import Resume2 from './Resume2';
const PdfConverter = ({resumeNo = 1}) => {
  const componentRef = useRef();

  const handleDownloadPdf = () => {
    const input = componentRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('resume.pdf');
    });
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      {/* Button to trigger PDF download */}
      <Button onClick={handleDownloadPdf} variant="contained" sx={{
                                padding: '10px 20px',
                                borderRadius: '8px',
                                background: 'linear-gradient(45deg, #ff6b6b, #f06595)',
                                color: '#fff',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #f06595, #ff6b6b)',
                                },
                                mb : 2
                            }}>
        Download as PDF
      </Button>
      
      <Card
  ref={componentRef}
  sx={{
    maxWidth: 900,
    margin: 'auto',
    p: 0,
    boxShadow: 'none', // Remove shadow
    border: 'none',    // Remove border
    borderRadius: '16px',
  }}
>
  {/* The resume content goes here */}
  {resumeNo===1 ? <Resume1/> : <Resume2/>}

</Card>

    </Box>
  );
};

PdfConverter.propTypes ={

  resumeNo : PropTypes.number
}
export default PdfConverter;
