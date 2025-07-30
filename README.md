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
│   ├── papertemplate/      # Paper template definitions
│   │   └── paper-templates.js # Paper template configurations
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
2. Select a paper template from the dropdown menu
3. Use the print function for template-specific label printing
4. Optimized layouts for specific label sheet formats

## Paper Templates

TagForge includes a flexible paper template system for printing on specific label sheets:

### Available Templates

- **A-ONE 72230**: A4 30-label sheet (53.3mm × 25.4mm each)
  - 3 columns × 10 rows layout
  - 3.8mm gaps between columns
  - Perfect for A-ONE 72230 label sheets
  - **Supported Barcode Types**: Code 128, Code 39 only

- **A-ONE 31553**: A4 40-label sheet (30mm × 30mm each)
  - 5 columns × 8 rows layout
  - 4mm gaps between stickers
  - Square stickers perfect for QR codes
  - **Supported Barcode Types**: QR Code only

### Template System Features

- **Template Validation**: Ensures a template is selected before printing
- **Barcode Type Restrictions**: Templates can specify supported barcode types
- **Extensible Design**: Easy to add new templates for different label sheets
- **Template-Specific CSS**: Each template includes complete print styling
- **Error Handling**: Clear error messages for missing template selection and incompatible barcode types

### Adding New Templates

New paper templates can be easily added to the system by extending the `PaperTemplates` object in `libs/papertemplate/paper-templates.js`. Each template includes:

- Template metadata (name, description, dimensions)
- Supported barcode types (optional array of allowed barcode formats)
- Complete CSS styling for print layout
- Grid configuration (columns, rows, spacing)
- Page setup (size, margins, orientation)

The template file is loaded before the main application, making it easy to add new templates without modifying the core application code.

#### Template Structure Example:
```javascript
'NEW-TEMPLATE': {
    name: 'Template Name',
    description: 'Template description',
    supportedBarcodeTypes: ['CODE128', 'CODE39', 'QR'], // Optional
    // ... other properties
    css: `/* Complete CSS for this template */`
}
```

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

---

## Version Information

**Current Version:** 0.0.49

**Release Date:** July 2025

**Author:** 7ANG0N1N3

**GitHub:** https://github.com/tagforge/tagforge

### Version History

- **0.0.49** - Added A-ONE 31553 template for QR codes (40 square stickers, 30×30mm each)
- **0.0.48** - Added barcode type restrictions to templates (A-ONE 72230 supports Code 128/39 only)
- **0.0.47** - Added paper template system with A-ONE 72230 template, template validation and error handling
- **0.0.46** - A4 paper print layout with exact sticker dimensions (53.3mm × 25.4mm), optimized barcode sizing
- **0.0.45** - Removed header text, restored feature buttons, streamlined interface
- **0.0.44** - Optimized codebase, removed unused libraries, improved print layout
- **0.0.43** - Previous version with full feature set
- **0.0.42** - Initial barcode-fallback implementation