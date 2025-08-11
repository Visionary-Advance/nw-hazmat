// app/api/generate-chain-of-custody/route.js
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.json();
    
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([612, 792]); // Standard letter size
    
    // Embed fonts
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // Colors
    const black = rgb(0, 0, 0);
    const blue = rgb(0, 0, 0.8);
    
    // Helper function to draw text
    const drawText = (text, x, y, options = {}) => {
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
    const drawLine = (x1, y1, x2, y2) => {
      page.drawLine({
        start: { x: x1, y: y1 },
        end: { x: x2, y: y2 },
        color: black,
        thickness: 1
      });
    };
    
    // Helper function to draw checkbox
    const drawCheckbox = (x, y, checked = false) => {
      page.drawRectangle({
        x,
        y,
        width: 10,
        height: 10,
        borderColor: black,
        borderWidth: 1
      });
      if (checked) {
        drawText('X', x + 2, y + 1, { size: 8, font: boldFont });
      }
    };
    
    // HEADER - Chain of Custody title
    drawText('Chain of Custody', 250, 750, { size: 16, font: boldFont });
    
    // COMPANY INFO BOX (Top Left)
    drawText('NorthWest HazMat', 50, 720, { size: 12, font: boldFont });
    drawText('Inc.', 50, 708, { size: 10, font: boldFont });
    drawText('36 West Q Street', 50, 696, { size: 9 });
    drawText('Springfield, Oregon', 50, 684, { size: 9 });
    drawText('97477', 50, 672, { size: 9 });
    drawText('1-800-597-1323', 50, 660, { size: 9 });
    drawText('541-988-9823', 50, 648, { size: 9 });
    drawText('www.nwhazmat.com', 50, 636, { size: 9, color: blue });
    
    // CLIENT INFORMATION SECTION (Left side)
    let yPos = 600;
    
    drawText('Client:', 50, yPos, { size: 10, font: boldFont });
    drawLine(85, yPos - 2, 250, yPos - 2);
    drawText(formData.client || '', 87, yPos - 1, { size: 9 });
    
    yPos -= 20;
    drawText('Address:', 50, yPos, { size: 10, font: boldFont });
    drawLine(95, yPos - 2, 250, yPos - 2);
    drawText(formData.address || '', 97, yPos - 1, { size: 9 });
    
    yPos -= 20;
    drawText('City, State, Zip:', 50, yPos, { size: 10, font: boldFont });
    drawLine(135, yPos - 2, 250, yPos - 2);
    drawText(formData.cityStateZip || '', 137, yPos - 1, { size: 9 });
    
    yPos -= 20;
    drawText('Phone:', 50, yPos, { size: 10, font: boldFont });
    drawLine(85, yPos - 2, 250, yPos - 2);
    drawText(formData.phone || '', 87, yPos - 1, { size: 9 });
    
    yPos -= 20;
    drawText('Contact:', 50, yPos, { size: 10, font: boldFont });
    drawLine(90, yPos - 2, 250, yPos - 2);
    drawText(formData.contact || '', 92, yPos - 1, { size: 9 });
    
    // SAMPLER INFORMATION (Middle)
    yPos = 600;
    const midX = 270;
    
    drawText('Sampler Name:', midX, yPos, { size: 10, font: boldFont });
    drawLine(midX + 85, yPos - 2, midX + 200, yPos - 2);
    drawText(formData.samplerName || '', midX + 87, yPos - 1, { size: 9 });
    
    yPos -= 40;
    drawText('Email:', midX, yPos, { size: 10, font: boldFont });
    drawLine(midX + 35, yPos - 2, midX + 200, yPos - 2);
    drawText(formData.email || '', midX + 37, yPos - 1, { size: 9 });
    
    yPos -= 40;
    drawText('Payment:', midX, yPos, { size: 10, font: boldFont });
    
    // PAYMENT OPTIONS (Right side)
    const rightX = 490;
    yPos = 600;
    
    drawText('PAID BY:', rightX, yPos, { size: 10, font: boldFont });
    
    yPos -= 20;
    drawCheckbox(rightX, yPos, formData.paymentMethod === 'cash');
    drawText('Cash', rightX + 15, yPos + 2, { size: 9 });
    
    yPos -= 20;
    drawCheckbox(rightX, yPos, formData.paymentMethod === 'check');
    drawText('Check', rightX + 15, yPos + 2, { size: 9 });
    
    yPos -= 20;
    drawCheckbox(rightX, yPos, formData.paymentMethod === 'card');
    drawText('Card', rightX + 15, yPos + 2, { size: 9 });
    
    // ANALYSIS SECTION
    yPos = 480;
    drawText('Analysis:', 50, yPos, { size: 10, font: boldFont });
    
    drawCheckbox(120, yPos, formData.analysis?.includes('asbestos'));
    drawText('ASBESTOS', 135, yPos + 2, { size: 9, font: boldFont });
    
    drawCheckbox(230, yPos, formData.analysis?.includes('mold'));
    drawText('MOLD', 245, yPos + 2, { size: 9, font: boldFont });
    
    drawCheckbox(310, yPos, formData.analysis?.includes('lead'));
    drawText('LEAD', 325, yPos + 2, { size: 9, font: boldFont });
    
    // ASBESTOS TURNAROUND
    yPos -= 25;
    drawText('Asbestos', 50, yPos, { size: 10, font: boldFont });
    yPos -= 15;
    drawText('Turnaround:', 50, yPos, { size: 10, font: boldFont });
    
    yPos -= 20;
    drawCheckbox(50, yPos, formData.turnaround === '4hour');
    drawText('4 Hour Rush', 65, yPos + 2, { size: 9 });
    
    yPos -= 20;
    drawCheckbox(50, yPos, formData.turnaround === '2business');
    drawText('2 Business Days', 65, yPos + 2, { size: 9 });
    
    // SITE INFORMATION
    yPos = 370;
    drawText('Site', 50, yPos, { size: 10, font: boldFont });
    drawText('Address:', 80, yPos, { size: 10, font: boldFont });
    drawLine(125, yPos - 2, 350, yPos - 2);
    drawText(formData.siteAddress || '', 127, yPos - 1, { size: 9 });
    
    drawText('City/State/Zip:', 360, yPos, { size: 10, font: boldFont });
    drawLine(440, yPos - 2, 560, yPos - 2);
    drawText(formData.siteCityStateZip || '', 442, yPos - 1, { size: 9 });
    
    yPos -= 25;
    drawText('Project:', 50, yPos, { size: 10, font: boldFont });
    drawLine(90, yPos - 2, 300, yPos - 2);
    drawText(formData.project || '', 92, yPos - 1, { size: 9 });
    
    drawText('PO#:', 320, yPos, { size: 10, font: boldFont });
    drawLine(345, yPos - 2, 450, yPos - 2);
    drawText(formData.poNumber || '', 347, yPos - 1, { size: 9 });
    
    // SAMPLE TABLE
    const tableStartY = 300;
    const tableWidth = 512;
    const tableHeight = 100;
    const rowHeight = 20;
    
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
    drawText('Sample', 55, headerY, { size: 9, font: boldFont });
    drawText('No.', 60, headerY - 10, { size: 9, font: boldFont });
    
    drawText('Description / Location', 110, headerY - 5, { size: 9, font: boldFont });
    drawText('Date', 280, headerY - 5, { size: 9, font: boldFont });
    drawText('Other Info / Special', 350, headerY, { size: 9, font: boldFont });
    drawText('Instruction', 365, headerY - 10, { size: 9, font: boldFont });
    
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
    const samples = formData.samples || [];
    for (let i = 0; i < 4; i++) {
      const rowY = tableStartY - 35 - (i * 20);
      const sample = samples[i] || {};
      
      drawText(sample.number || '', 55, rowY, { size: 8 });
      drawText(sample.description || '', 105, rowY, { size: 8 });
      drawText(sample.date || '', 275, rowY, { size: 8 });
      drawText(sample.otherInfo || '', 325, rowY, { size: 8 });
      
      // Row separator lines (except for last row)
      if (i < 3) {
        page.drawLine({
          start: { x: 50, y: rowY - 10 },
          end: { x: 562, y: rowY - 10 },
          color: black,
          thickness: 1
        });
      }
    }
    
    // CHAIN OF CUSTODY SECTION
    yPos = 175;
    
    // Relinquished by
    drawText('Relinquished by:', 50, yPos, { size: 9, font: boldFont });
    drawText('X Print', 50, yPos - 15, { size: 8 });
    drawLine(100, yPos - 17, 220, yPos - 17);
    drawText(formData.relinquishedBy || '', 102, yPos - 16, { size: 8 });
    
    drawText('Date/Time:', 240, yPos - 15, { size: 8 });
    drawLine(280, yPos - 17, 380, yPos - 17);
    drawText(formData.relinquishedDateTime || '', 282, yPos - 16, { size: 8 });
    
    drawText('X Signature', 400, yPos - 15, { size: 8 });
    drawLine(450, yPos - 17, 560, yPos - 17);
    
    // Received by
    yPos -= 35;
    drawText('Received by:', 50, yPos, { size: 9, font: boldFont });
    drawText('X Print', 50, yPos - 15, { size: 8 });
    drawLine(100, yPos - 17, 220, yPos - 17);
    drawText(formData.receivedBy || '', 102, yPos - 16, { size: 8 });
    
    drawText('Date/Time:', 240, yPos - 15, { size: 8 });
    drawLine(280, yPos - 17, 380, yPos - 17);
    drawText(formData.receivedDateTime || '', 282, yPos - 16, { size: 8 });
    
    drawText('X Signature', 400, yPos - 15, { size: 8 });
    drawLine(450, yPos - 17, 560, yPos - 17);
    
    // Results
    yPos -= 35;
    drawText('Results: Called / Faxed / Emailed', 50, yPos, { size: 9, font: boldFont });
    drawText('X Print', 50, yPos - 15, { size: 8 });
    drawLine(100, yPos - 17, 220, yPos - 17);
    drawText(formData.resultsBy || '', 102, yPos - 16, { size: 8 });
    
    drawText('Date/Time:', 240, yPos - 15, { size: 8 });
    drawLine(280, yPos - 17, 380, yPos - 17);
    drawText(formData.resultsDateTime || '', 282, yPos - 16, { size: 8 });
    
    drawText('X Signature', 400, yPos - 15, { size: 8 });
    drawLine(450, yPos - 17, 560, yPos - 17);
    
    // FOOTER NOTE
    const noteY = 50;
    const noteLines = [
      'Note: If submitted samples are non-homogeneous in nature, then sub-samples of the components will be analyzed and billed as separate layers. Because of',
      'equipment/measurement limitations, asbestos fiber content will be unable to be determined in some samples. Those samples determined to contain asbestos fibers,',
      'will have the following measurement percentage ranges (1% = 0-3%, 5% = 1-9%, 10% = 5-15%, 20% = 10-30%, 50% = 40-60%) as specified per EPA method',
      '600/R-93/116. If samples are not collected by an AHERA Accredited Inspector, then the accuracy of results will be determined by the methodology and acuity of the',
      'sample collector'
    ];
    
    noteLines.forEach((line, index) => {
      drawText(line, 50, noteY - (index * 8), { size: 6 });
    });
    
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