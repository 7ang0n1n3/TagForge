// TagForge Paper Templates - Version 0.0.48
// Paper template definitions for different label sheets

const PaperTemplates = {
    'A-ONE-72230': {
        name: 'A-ONE 72230',
        description: 'A4 30-label sheet (53.3mm × 25.4mm each)',
        pageSize: 'A4',
        margins: '21.5mm 19mm 21.5mm 19mm',
        stickerWidth: '53.3mm',
        stickerHeight: '25.4mm',
        columnGap: '3.8mm',
        rowGap: '0mm',
        columns: 3,
        rows: 10,
        totalStickers: 30,
        supportedBarcodeTypes: ['CODE128', 'CODE39'],
        css: `
            @page {
                size: A4;
                margin: 21.5mm 19mm 21.5mm 19mm;
            }
            
            body { 
                margin: 0; 
                padding: 0; 
                font-family: Arial, sans-serif;
                font-size: 8pt;
                height: 254mm;
                overflow: hidden;
                page-break-after: avoid;
                page-break-inside: avoid;
            }
            
            .barcode-item { 
                display: inline-block; 
                margin: 0; 
                padding: 0; 
                border: none; 
                text-align: center; 
                width: 53.3mm;
                height: 25.4mm;
                vertical-align: top;
                box-sizing: border-box;
                margin-right: 3.8mm;
                margin-bottom: 0;
                overflow: hidden;
                position: relative;
                page-break-inside: avoid;
                page-break-after: avoid;
            }
            
            .barcode-item:nth-child(3n) {
                margin-right: 0;
            }
            
            .barcode-item img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                max-width: 100%;
                max-height: 100%;
                width: auto;
                height: auto;
                display: block;
                margin: 0 auto;
                object-fit: contain;
            }
        `
    }
    // Future templates can be added here
    // Example:
    // 'ANOTHER-TEMPLATE': {
    //     name: 'Another Template',
    //     description: 'Description of the template',
    //     pageSize: 'A4',
    //     margins: '20mm 20mm 20mm 20mm',
    //     stickerWidth: '50mm',
    //     stickerHeight: '25mm',
    //     columnGap: '5mm',
    //     rowGap: '5mm',
    //     columns: 4,
    //     rows: 8,
    //     totalStickers: 32,
    //     css: `/* Complete CSS for this template */`
    // }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PaperTemplates;
} 