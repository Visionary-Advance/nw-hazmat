// app/api/generate-chain-of-custody/route.js
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.json();
    
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    
    // Embed fonts
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // Colors
    const black = rgb(0, 0, 0);
    const blue = rgb(0, 0, 0.8);
    
    // Constants
    const SAMPLES_FIRST_PAGE = 5;
    const SAMPLES_PER_CONTINUATION_PAGE = 20;
    const samples = formData.samples || [];
    
    // Calculate total pages needed
    let totalPages = 1;
    if (samples.length > SAMPLES_FIRST_PAGE) {
      const remainingSamples = samples.length - SAMPLES_FIRST_PAGE;
      totalPages += Math.ceil(remainingSamples / SAMPLES_PER_CONTINUATION_PAGE);
    }
    
    // Helper function to draw text
    const drawText = (page, text, x, y, options = {}) => {
      page.drawText(text || '', {
        x,
        y,
        size: options.size || 10,
        font: options.font || font,
        color: options.color || black,
        ...options
      });
    };
    
    // Helper function to draw lines (for form fields)
    const drawLine = (page, x1, y1, x2, y2) => {
      page.drawLine({
        start: { x: x1, y: y1 },
        end: { x: x2, y: y2 },
        color: black,
        thickness: 1
      });
    };
    
    // Helper function to draw checkbox
    const drawCheckbox = (page, x, y, checked = false) => {
      page.drawRectangle({
        x,
        y,
        width: 10,
        height: 10,
        borderColor: black,
        borderWidth: 1
      });
      if (checked) {
        drawText(page, 'X', x + 2, y + 1, { size: 8, font: boldFont });
      }
    };
    
    // Function to draw header section (used on all pages)
    const drawHeader = (page, pageNum, totalPages) => {
      // HEADER - Chain of Custody title
      drawText(page, 'Chain of Custody', 250, 750, { size: 16, font: boldFont });
      
      // Page number
      if (totalPages > 1) {
        drawText(page, `Page ${pageNum} of ${totalPages}`, 500, 750, { size: 10 });
      }
      
      // COMPANY INFO BOX (Top Left)
      drawText(page, 'NorthWest HazMat', 50, 720, { size: 12, font: boldFont });
      drawText(page, 'Inc.', 50, 708, { size: 10, font: boldFont });
      drawText(page, '36 West Q Street', 50, 696, { size: 9 });
      drawText(page, 'Springfield, Oregon', 50, 684, { size: 9 });
      drawText(page, '97477', 50, 672, { size: 9 });
      drawText(page, '1-800-597-1323', 50, 660, { size: 9 });
      drawText(page, '541-988-9823', 50, 648, { size: 9 });
      drawText(page, 'www.nwhazmat.com', 50, 636, { size: 9, color: blue });
    };
    
    // Function to draw form info (client, sampler, payment, analysis)
    const drawFormInfo = (page) => {
      // CLIENT INFORMATION SECTION (Left side)
      let yPos = 600;
      
      drawText(page, 'Client:', 50, yPos, { size: 10, font: boldFont });
      drawLine(page, 85, yPos - 2, 250, yPos - 2);
      drawText(page, formData.client || '', 87, yPos - 1, { size: 9 });
      
      yPos -= 20;
      drawText(page, 'Address:', 50, yPos, { size: 10, font: boldFont });
      drawLine(page, 95, yPos - 2, 250, yPos - 2);
      drawText(page, formData.address || '', 97, yPos - 1, { size: 9 });
      
      yPos -= 20;
      drawText(page, 'City, State, Zip:', 50, yPos, { size: 10, font: boldFont });
      drawLine(page, 135, yPos - 2, 250, yPos - 2);
      drawText(page, formData.cityStateZip || '', 137, yPos - 1, { size: 9 });
      
      yPos -= 20;
      drawText(page, 'Phone:', 50, yPos, { size: 10, font: boldFont });
      drawLine(page, 85, yPos - 2, 250, yPos - 2);
      drawText(page, formData.phone || '', 87, yPos - 1, { size: 9 });
      
      yPos -= 20;
      drawText(page, 'Contact:', 50, yPos, { size: 10, font: boldFont });
      drawLine(page, 90, yPos - 2, 250, yPos - 2);
      drawText(page, formData.contact || '', 92, yPos - 1, { size: 9 });
      
      // SAMPLER INFORMATION (Middle)
      yPos = 600;
      const midX = 270;
      
      drawText(page, 'Sampler Name:', midX, yPos, { size: 10, font: boldFont });
      drawLine(page, midX + 85, yPos - 2, midX + 200, yPos - 2);
      drawText(page, formData.samplerName || '', midX + 87, yPos - 1, { size: 9 });
      
      yPos -= 40;
      drawText(page, 'Email:', midX, yPos, { size: 10, font: boldFont });
      drawLine(page, midX + 35, yPos - 2, midX + 200, yPos - 2);
      drawText(page, formData.email || '', midX + 37, yPos - 1, { size: 9 });
      
      yPos -= 40;
      drawText(page, 'Payment:', midX, yPos, { size: 10, font: boldFont });
      
      // PAYMENT OPTIONS (Right side)
      const rightX = 490;
      yPos = 600;
      
      drawText(page, 'PAID BY:', rightX, yPos, { size: 10, font: boldFont });
      
      yPos -= 20;
      drawCheckbox(page, rightX, yPos, formData.paymentMethod === 'cash');
      drawText(page, 'Cash', rightX + 15, yPos + 2, { size: 9 });
      
      yPos -= 20;
      drawCheckbox(page, rightX, yPos, formData.paymentMethod === 'check');
      drawText(page, 'Check', rightX + 15, yPos + 2, { size: 9 });
      
      yPos -= 20;
      drawCheckbox(page, rightX, yPos, formData.paymentMethod === 'card');
      drawText(page, 'Card', rightX + 15, yPos + 2, { size: 9 });
      
      // ANALYSIS SECTION
      yPos = 480;
      drawText(page, 'Analysis:', 50, yPos, { size: 10, font: boldFont });
      
      drawCheckbox(page, 120, yPos, formData.analysis?.includes('asbestos'));
      drawText(page, 'ASBESTOS', 135, yPos + 2, { size: 9, font: boldFont });
      
      drawCheckbox(page, 230, yPos, formData.analysis?.includes('mold'));
      drawText(page, 'MOLD', 245, yPos + 2, { size: 9, font: boldFont });
      
      drawCheckbox(page, 310, yPos, formData.analysis?.includes('lead'));
      drawText(page, 'LEAD', 325, yPos + 2, { size: 9, font: boldFont });
      
      // ASBESTOS TURNAROUND
      yPos -= 25;
      drawText(page, 'Asbestos', 50, yPos, { size: 10, font: boldFont });
      yPos -= 15;
      drawText(page, 'Turnaround:', 50, yPos, { size: 10, font: boldFont });
      
      yPos -= 20;
      drawCheckbox(page, 50, yPos, formData.turnaround === '4hour');
      drawText(page, '4 Hour Rush', 65, yPos + 2, { size: 9 });
      
      yPos -= 20;
      drawCheckbox(page, 50, yPos, formData.turnaround === '2business');
      drawText(page, '2 Business Days', 65, yPos + 2, { size: 9 });
      
      // SITE INFORMATION
      yPos = 370;
      drawText(page, 'Site', 50, yPos, { size: 10, font: boldFont });
      drawText(page, 'Address:', 80, yPos, { size: 10, font: boldFont });
      drawLine(page, 125, yPos - 2, 350, yPos - 2);
      drawText(page, formData.siteAddress || '', 127, yPos - 1, { size: 9 });
      
      drawText(page, 'City/State/Zip:', 360, yPos, { size: 10, font: boldFont });
      drawLine(page, 440, yPos - 2, 560, yPos - 2);
      drawText(page, formData.siteCityStateZip || '', 442, yPos - 1, { size: 9 });
      
      yPos -= 25;
      drawText(page, 'Project:', 50, yPos, { size: 10, font: boldFont });
      drawLine(page, 90, yPos - 2, 300, yPos - 2);
      drawText(page, formData.project || '', 92, yPos - 1, { size: 9 });
      
      drawText(page, 'PO#:', 320, yPos, { size: 10, font: boldFont });
      drawLine(page, 345, yPos - 2, 450, yPos - 2);
      drawText(page, formData.poNumber || '', 347, yPos - 1, { size: 9 });
    };
    
    // Function to draw sample table
    const drawSampleTable = (page, samplesForPage, isFirstPage = false) => {
      // Position table higher on continuation pages
      const tableStartY = isFirstPage ? 300 : 580;
      const tableWidth = 512;
      const rowHeight = 20;
      const tableHeight = 20 + (samplesForPage.length * rowHeight); // Header + rows
      
      // Draw table border
      page.drawRectangle({
        x: 50,
        y: tableStartY - tableHeight,
        width: tableWidth,
        height: tableHeight,
        borderColor: black,
        borderWidth: 1
      });
      
      // Table headers
      const headerY = tableStartY - 10;
      drawText(page, 'Sample', 55, headerY, { size: 9, font: boldFont });
      drawText(page, 'No.', 60, headerY - 10, { size: 9, font: boldFont });
      
      drawText(page, 'Description / Location', 110, headerY - 5, { size: 9, font: boldFont });
      drawText(page, 'Date', 280, headerY - 5, { size: 9, font: boldFont });
      drawText(page, 'Other Info / Special', 350, headerY, { size: 9, font: boldFont });
      drawText(page, 'Instruction', 365, headerY - 10, { size: 9, font: boldFont });
      
      // Vertical lines
      const verticalLines = [100, 270, 320, 450];
      verticalLines.forEach(x => {
        page.drawLine({
          start: { x, y: tableStartY },
          end: { x, y: tableStartY - tableHeight },
          color: black,
          thickness: 1
        });
      });
      
      // Header separator line
      page.drawLine({
        start: { x: 50, y: tableStartY - 20 },
        end: { x: 562, y: tableStartY - 20 },
        color: black,
        thickness: 1
      });
      
      // Sample rows
      samplesForPage.forEach((sample, i) => {
        const rowY = tableStartY - 35 - (i * 20);
        
        drawText(page, sample.number || '', 55, rowY, { size: 8 });
        drawText(page, sample.description || '', 105, rowY, { size: 8 });
        drawText(page, sample.date || '', 275, rowY, { size: 8 });
        drawText(page, sample.otherInfo || '', 325, rowY, { size: 8 });
        
        // Row separator lines (except for last row)
        if (i < samplesForPage.length - 1) {
          page.drawLine({
            start: { x: 50, y: rowY - 10 },
            end: { x: 562, y: rowY - 10 },
            color: black,
            thickness: 1
          });
        }
      });
    };
    
    // Function to draw chain of custody section (only on last page)
    const drawChainOfCustody = (page) => {
      let yPos = 175;
      
      // Relinquished by
      drawText(page, 'Relinquished by:', 50, yPos, { size: 9, font: boldFont });
      drawText(page, 'X Print', 50, yPos - 15, { size: 8 });
      drawLine(page, 100, yPos - 17, 220, yPos - 17);
      drawText(page, formData.relinquishedBy || '', 102, yPos - 16, { size: 8 });
      
      drawText(page, 'Date/Time:', 240, yPos - 15, { size: 8 });
      drawLine(page, 280, yPos - 17, 380, yPos - 17);
      drawText(page, formData.relinquishedDateTime || '', 282, yPos - 16, { size: 8 });
      
      drawText(page, 'X Signature', 400, yPos - 15, { size: 8 });
      drawLine(page, 450, yPos - 17, 560, yPos - 17);
      
      // Received by
      yPos -= 35;
      drawText(page, 'Received by:', 50, yPos, { size: 9, font: boldFont });
      drawText(page, 'X Print', 50, yPos - 15, { size: 8 });
      drawLine(page, 100, yPos - 17, 220, yPos - 17);
      drawText(page, formData.receivedBy || '', 102, yPos - 16, { size: 8 });
      
      drawText(page, 'Date/Time:', 240, yPos - 15, { size: 8 });
      drawLine(page, 280, yPos - 17, 380, yPos - 17);
      drawText(page, formData.receivedDateTime || '', 282, yPos - 16, { size: 8 });
      
      drawText(page, 'X Signature', 400, yPos - 15, { size: 8 });
      drawLine(page, 450, yPos - 17, 560, yPos - 17);
      
      // Results
      yPos -= 35;
      drawText(page, 'Results: Called / Faxed / Emailed', 50, yPos, { size: 9, font: boldFont });
      drawText(page, 'X Print', 50, yPos - 15, { size: 8 });
      drawLine(page, 100, yPos - 17, 220, yPos - 17);
      drawText(page, formData.resultsBy || '', 102, yPos - 16, { size: 8 });
      
      drawText(page, 'Date/Time:', 240, yPos - 15, { size: 8 });
      drawLine(page, 280, yPos - 17, 380, yPos - 17);
      drawText(page, formData.resultsDateTime || '', 282, yPos - 16, { size: 8 });
      
      drawText(page, 'X Signature', 400, yPos - 15, { size: 8 });
      drawLine(page, 450, yPos - 17, 560, yPos - 17);
    };
    
    // Function to draw footer note
    const drawFooterNote = (page) => {
      const noteY = 50;
      const noteLines = [
        'Note: If submitted samples are non-homogeneous in nature, then sub-samples of the components will be analyzed and billed as separate layers. Because of',
        'equipment/measurement limitations, asbestos fiber content will be unable to be determined in some samples. Those samples determined to contain asbestos fibers,',
        'will have the following measurement percentage ranges (1% = 0-3%, 5% = 1-9%, 10% = 5-15%, 20% = 10-30%, 50% = 40-60%) as specified per EPA method',
        '600/R-93/116. If samples are not collected by an AHERA Accredited Inspector, then the accuracy of results will be determined by the methodology and acuity of the',
        'sample collector'
      ];
      
      noteLines.forEach((line, index) => {
        drawText(page, line, 50, noteY - (index * 8), { size: 6 });
      });
    };
    
    // Generate pages
    let sampleIndex = 0;
    
    for (let pageNum = 0; pageNum < totalPages; pageNum++) {
      const page = pdfDoc.addPage([612, 792]); // Standard letter size
      const isFirstPage = pageNum === 0;
      const isLastPage = pageNum === totalPages - 1;
      
      // Draw header on every page
      drawHeader(page, pageNum + 1, totalPages);
      
      // Draw form info only on first page
      if (isFirstPage) {
        drawFormInfo(page);
      } else {
        // On continuation pages, add a note at the top
        drawText(page, `Client: ${formData.client || ''} - Project: ${formData.project || ''}`, 50, 600, { size: 10, font: boldFont });
      }
      
      // Get samples for this page
      const samplesPerPage = isFirstPage ? SAMPLES_FIRST_PAGE : SAMPLES_PER_CONTINUATION_PAGE;
      const endIdx = Math.min(sampleIndex + samplesPerPage, samples.length);
      const samplesForPage = samples.slice(sampleIndex, endIdx);
      sampleIndex = endIdx;
      
      // Draw sample table
      drawSampleTable(page, samplesForPage, isFirstPage);
      
      // Draw chain of custody only on last page
      if (isLastPage) {
        drawChainOfCustody(page);
      }
      
      // Draw footer note on every page
      drawFooterNote(page);
    }
    
    // Convert to bytes
    const pdfBytes = await pdfDoc.save();
    
    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="chain-of-custody.pdf"',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate PDF', 
      details: error.message 
    }, { status: 500 });
  }
}