# TagForge

An offline barcode generation system providing comprehensive barcode generation capabilities without requiring internet connectivity. TagForge supports Code 128, Code 39, and QR codes with professional-quality generation using bwip-js and qrcode-generator libraries.

## Features

- **Single Barcode Generation**: Generate individual barcodes with custom settings
- **Bulk Barcode Generation**: Generate multiple barcodes from Excel/CSV data
- **Multiple Barcode Formats**: Support for Code 128, Code 39, and QR codes
- **Offline Operation**: All libraries and dependencies included locally
- **Excel Integration**: Import data from Excel/CSV files
- **Label Printing**: Print barcode labels in bulk (3-column layout)
- **PNG Export**: Export barcodes as optimized PNG files
- **Modern UI**: Clean, responsive interface with Bootstrap 5
- **Professional Quality**: Uses bwip-js for reliable barcode generation
- **QR Code Support**: Dedicated QR code generation with qrcode-generator library

## Project Structure

```
TagForge/
├── libs/                    # External libraries organized by product
│   ├── barcode/            # Barcode generation libraries
│   │   └── bwip-js.min.js  # Primary barcode generator
│   ├── qrcode/             # QR code generation libraries
│   │   └── qrcode.min.js   # QR code generator
│   ├── excel/              # Excel/CSV processing libraries
│   │   └── xlsx.full.min.js # Excel/CSV file processing
│   ├── ui/                 # UI framework libraries
│   │   ├── bootstrap.min.css
│   │   ├── bootstrap.bundle.min.js
│   │   ├── bootstrap-icons.css
│   │   └── bootstrap-icons.woff2
│   └── utils/              # Utility libraries
│       └── FileSaver.min.js # File download functionality
├── assets/                 # Application assets
│   ├── css/
│   │   └── style.css       # Custom styles
│   └── js/
│       ├── app.js          # Main application logic
│       └── barcode-fallback.js # Custom barcode generator
├── index.html              # Main application file
├── sample_data.csv         # Sample data file
└── README.md               # This file
```

## Getting Started

1. Clone the repository
2. Open `index.html` in your browser
3. Choose from three main functions:
   - **Single Barcode**: Generate individual barcodes with custom settings
   - **Bulk Generation**: Import Excel/CSV files for batch processing
   - **Print Labels**: Create and print barcode labels
4. Start generating barcodes offline!

## Usage

### Single Barcode Generation
1. Select barcode type (Code 128, Code 39, or QR Code)
2. Enter your data
3. Adjust settings (width, height, font size)
4. Generate and download as PNG

### Bulk Generation
1. Upload Excel or CSV file
2. Select the data column
3. Choose barcode type and settings
4. Generate all barcodes at once
5. Download individual PNG files or print in 3-column layout

### Print Labels
1. Generate barcodes using the single or bulk methods
2. Use the print function for label printing
3. Optimized 3-column layout for efficient printing

## Supported Barcode Types

- **Code 128**: High-density alphanumeric barcode for industrial applications
- **Code 39**: Industrial barcode standard with alphanumeric support
- **QR Code**: 2D matrix barcode for storing large amounts of data

## Technical Details

- **Primary Library**: bwip-js for reliable 1D barcode generation
- **QR Code Library**: qrcode-generator for professional QR code creation
- **Fallback System**: Custom SimpleBarcodeGenerator for compatibility
- **Canvas Rendering**: HTML5 Canvas for optimal image quality
- **Export Format**: PNG only (optimized for size and quality)
- **Height Range**: 5px to 30px for optimal scanning
- **Font Size Range**: 5px to 20px (default: 12px)
- **Fixed Margin**: 5px for consistent spacing
- **Colors**: Standard black-on-white for optimal scanning

## Optimizations

- **Removed unused libraries**: Eliminated html2canvas, jsPDF, JSZip, and JsBarcode
- **Consolidated structure**: All libraries organized in logical directories
- **Clean HTML**: All CSS and JavaScript references grouped in head section
- **Minimal dependencies**: Only essential libraries included
- **Optimized print layout**: 3-column layout with minimal spacing

## Browser Compatibility

- Modern browsers with HTML5 Canvas support
- File API support for Excel/CSV upload
- Blob API support for file downloads