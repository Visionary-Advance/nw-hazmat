// __tests__/api/generate-chain-of-custody.test.js
import { POST } from '@/app/api/generate-chain-of-custody/route';
import { PDFDocument } from 'pdf-lib';

// Mock pdf-lib
jest.mock('pdf-lib', () => ({
  PDFDocument: {
    create: jest.fn(),
  },
  StandardFonts: {
    Helvetica: 'Helvetica',
    HelveticaBold: 'HelveticaBold',
  },
  rgb: jest.fn((r, g, b) => ({ r, g, b })),
}));

describe('Chain of Custody API', () => {
  let mockPdfDoc;
  let mockPage;
  let mockRequest;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock page methods
    mockPage = {
      drawText: jest.fn(),
      drawLine: jest.fn(),
      drawRectangle: jest.fn(),
    };

    // Mock PDF document methods
    mockPdfDoc = {
      addPage: jest.fn(() => mockPage),
      embedFont: jest.fn(() => Promise.resolve('mockFont')),
      save: jest.fn(() => Promise.resolve(new Uint8Array([1, 2, 3]))),
    };

    // Setup PDFDocument.create to return our mock
    PDFDocument.create.mockResolvedValue(mockPdfDoc);

    // Mock request object
    mockRequest = {
      json: jest.fn(),
    };
  });

  describe('Basic Functionality', () => {
    it('should generate a PDF with minimal data', async () => {
      const minimalData = {
        client: 'Test Client',
        samplerName: 'John Doe',
        samples: [{ number: '1', description: 'Sample 1', date: '2024-01-01', otherInfo: '' }],
      };

      mockRequest.json.mockResolvedValue(minimalData);

      const response = await POST(mockRequest);

      expect(response.status).toBe(200);
      expect(mockPdfDoc.addPage).toHaveBeenCalledTimes(1);
      expect(mockPdfDoc.save).toHaveBeenCalled();
    });

    it('should return PDF with correct headers', async () => {
      const testData = {
        client: 'Test Client',
        samplerName: 'John Doe',
        samples: [],
      };

      mockRequest.json.mockResolvedValue(testData);

      const response = await POST(mockRequest);

      expect(response.headers.get('Content-Type')).toBe('application/pdf');
      expect(response.headers.get('Content-Disposition')).toContain('attachment');
      expect(response.headers.get('Content-Disposition')).toContain('chain-of-custody.pdf');
    });
  });

  describe('Multi-page Generation', () => {
    it('should create 1 page for 5 or fewer samples', async () => {
      const data = {
        client: 'Test Client',
        samplerName: 'John Doe',
        samples: Array(5).fill(null).map((_, i) => ({
          number: `${i + 1}`,
          description: `Sample ${i + 1}`,
          date: '2024-01-01',
          otherInfo: '',
        })),
      };

      mockRequest.json.mockResolvedValue(data);

      await POST(mockRequest);

      expect(mockPdfDoc.addPage).toHaveBeenCalledTimes(1);
    });

    it('should create 2 pages for 6-20 samples', async () => {
      const data = {
        client: 'Test Client',
        samplerName: 'John Doe',
        samples: Array(10).fill(null).map((_, i) => ({
          number: `${i + 1}`,
          description: `Sample ${i + 1}`,
          date: '2024-01-01',
          otherInfo: '',
        })),
      };

      mockRequest.json.mockResolvedValue(data);

      await POST(mockRequest);

      // 5 on page 1, 5 on page 2 (with 20 per continuation page)
      expect(mockPdfDoc.addPage).toHaveBeenCalledTimes(2);
    });

    it('should create 3 pages for 27 samples', async () => {
      const data = {
        client: 'Test Client',
        samplerName: 'John Doe',
        samples: Array(27).fill(null).map((_, i) => ({
          number: `${i + 1}`,
          description: `Sample ${i + 1}`,
          date: '2024-01-01',
          otherInfo: '',
        })),
      };

      mockRequest.json.mockResolvedValue(data);

      await POST(mockRequest);

      // Page 1: 5 samples, Page 2: 20 samples, Page 3: 2 samples
      expect(mockPdfDoc.addPage).toHaveBeenCalledTimes(3);
    });

    it('should calculate correct number of pages for edge cases', async () => {
      // With 5 samples on page 1 and 20 per continuation page
      const testCases = [
        { samples: 0, expectedPages: 1 },   // Empty samples still needs 1 page
        { samples: 1, expectedPages: 1 },   // 1 sample on page 1
        { samples: 5, expectedPages: 1 },   // 5 samples on page 1 (max for first page)
        { samples: 6, expectedPages: 2 },   // 5 on page 1, 1 on page 2
        { samples: 25, expectedPages: 2 },  // 5 on page 1, 20 on page 2 (max for continuation)
        { samples: 26, expectedPages: 3 },  // 5 on page 1, 20 on page 2, 1 on page 3
        { samples: 45, expectedPages: 3 },  // 5 + 20 + 20 = 45
        { samples: 46, expectedPages: 4 },  // 5 + 20 + 20 + 1 = 46
      ];

      for (const { samples: sampleCount, expectedPages } of testCases) {
        jest.clearAllMocks();
        
        const data = {
          client: 'Test Client',
          samplerName: 'John Doe',
          samples: Array(sampleCount).fill(null).map((_, i) => ({
            number: `${i + 1}`,
            description: `Sample ${i + 1}`,
          })),
        };

        mockRequest.json.mockResolvedValue(data);
        await POST(mockRequest);

        expect(mockPdfDoc.addPage).toHaveBeenCalledTimes(expectedPages);
      }
    });
  });

  describe('Form Data Handling', () => {
    it('should handle all client information fields', async () => {
      const fullData = {
        client: 'Acme Corp',
        address: '123 Main St',
        cityStateZip: 'Portland, OR 97201',
        phone: '555-1234',
        contact: 'Jane Smith',
        samplerName: 'John Doe',
        email: 'john@example.com',
        paymentMethod: 'card',
        analysis: ['asbestos', 'lead'],
        turnaround: '4hour',
        siteAddress: '456 Site St',
        siteCityStateZip: 'Eugene, OR 97401',
        project: 'Building Renovation',
        poNumber: 'PO-12345',
        samples: [{ number: '1', description: 'Test', date: '2024-01-01', otherInfo: '' }],
        relinquishedBy: 'John Doe',
        relinquishedDateTime: '2024-01-01T10:00',
        receivedBy: 'Lab Tech',
        receivedDateTime: '2024-01-01T11:00',
        resultsBy: 'Lab Manager',
        resultsDateTime: '2024-01-02T09:00',
      };

      mockRequest.json.mockResolvedValue(fullData);

      const response = await POST(mockRequest);

      expect(response.status).toBe(200);
      expect(mockPage.drawText).toHaveBeenCalled();
    });

    it('should handle missing optional fields', async () => {
      const minimalData = {
        client: 'Test Client',
        samplerName: 'John Doe',
        samples: [],
      };

      mockRequest.json.mockResolvedValue(minimalData);

      const response = await POST(mockRequest);

      expect(response.status).toBe(200);
    });

    it('should handle empty analysis array', async () => {
      const data = {
        client: 'Test Client',
        samplerName: 'John Doe',
        analysis: [],
        samples: [],
      };

      mockRequest.json.mockResolvedValue(data);

      const response = await POST(mockRequest);

      expect(response.status).toBe(200);
    });
  });

  describe('Error Handling', () => {
    it('should return 500 if PDF creation fails', async () => {
      PDFDocument.create.mockRejectedValue(new Error('PDF creation failed'));

      mockRequest.json.mockResolvedValue({
        client: 'Test Client',
        samplerName: 'John Doe',
        samples: [],
      });

      const response = await POST(mockRequest);

      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body.error).toBe('Failed to generate PDF');
    });

    it('should return 500 if request parsing fails', async () => {
      mockRequest.json.mockRejectedValue(new Error('Invalid JSON'));

      const response = await POST(mockRequest);

      expect(response.status).toBe(500);
    });

    it('should handle null samples array', async () => {
      const data = {
        client: 'Test Client',
        samplerName: 'John Doe',
        samples: null,
      };

      mockRequest.json.mockResolvedValue(data);

      const response = await POST(mockRequest);

      expect(response.status).toBe(200);
      expect(mockPdfDoc.addPage).toHaveBeenCalledTimes(1);
    });
  });

  describe('PDF Drawing Operations', () => {
    it('should draw company header on all pages', async () => {
      const data = {
        client: 'Test Client',
        samplerName: 'John Doe',
        samples: Array(30).fill(null).map((_, i) => ({
          number: `${i + 1}`,
        })),
      };

      mockRequest.json.mockResolvedValue(data);

      await POST(mockRequest);

      // Should draw "NorthWest HazMat" on each page
      const headerCalls = mockPage.drawText.mock.calls.filter(
        call => call[0] === 'NorthWest HazMat'
      );
      
      // 2 pages for 30 samples (5 on page 1 + 20 on page 2 + 5 on page 3) = 3 pages
      expect(headerCalls.length).toBe(3);
    });

    it('should draw checkboxes for payment method', async () => {
      const data = {
        client: 'Test Client',
        samplerName: 'John Doe',
        paymentMethod: 'check',
        samples: [],
      };

      mockRequest.json.mockResolvedValue(data);

      await POST(mockRequest);

      expect(mockPage.drawRectangle).toHaveBeenCalled();
    });

    it('should draw table borders', async () => {
      const data = {
        client: 'Test Client',
        samplerName: 'John Doe',
        samples: [{ number: '1' }],
      };

      mockRequest.json.mockResolvedValue(data);

      await POST(mockRequest);

      expect(mockPage.drawLine).toHaveBeenCalled();
      expect(mockPage.drawRectangle).toHaveBeenCalled();
    });
  });

  describe('Page Layout', () => {
    it('should add page numbers on multi-page documents', async () => {
      const data = {
        client: 'Test Client',
        samplerName: 'John Doe',
        samples: Array(10).fill(null).map((_, i) => ({
          number: `${i + 1}`,
        })),
      };

      mockRequest.json.mockResolvedValue(data);

      await POST(mockRequest);

      // Should draw page numbers like "Page 1 of 2"
      const pageNumberCalls = mockPage.drawText.mock.calls.filter(
        call => typeof call[0] === 'string' && call[0].includes('Page')
      );
      
      expect(pageNumberCalls.length).toBeGreaterThan(0);
    });

    it('should show client/project header on continuation pages', async () => {
      const data = {
        client: 'Test Client',
        samplerName: 'John Doe',
        project: 'Test Project',
        samples: Array(10).fill(null).map((_, i) => ({
          number: `${i + 1}`,
        })),
      };

      mockRequest.json.mockResolvedValue(data);

      await POST(mockRequest);

      // Check for continuation page header
      const continuationHeaders = mockPage.drawText.mock.calls.filter(
        call => typeof call[0] === 'string' && 
               call[0].includes('Client:') && 
               call[0].includes('Project:')
      );
      
      expect(continuationHeaders.length).toBeGreaterThan(0);
    });
  });
});