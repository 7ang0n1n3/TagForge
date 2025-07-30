// TagForge Application - Version 0.0.48
// Main Application JavaScript

class TagForge {
    constructor() {
        this.currentBarcode = null;
        this.bulkData = [];
        
        // Use external paper templates
        this.paperTemplates = PaperTemplates;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupRangeInputs();
        this.setupNavigation();
        this.showSection('home');
    }

    setupEventListeners() {
        // Barcode form submission
        const barcodeForm = document.getElementById('barcodeForm');
        if (barcodeForm) {
            barcodeForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.generateBarcode();
            });
        }

        // File input change
        const excelFile = document.getElementById('excelFile');
        if (excelFile) {
            excelFile.addEventListener('change', (e) => {
                this.handleFileUpload(e.target.files[0]);
            });
        }

        // Range input updates
        this.setupRangeInputs();
        
        // Handle generate button click directly
        const generateButton = document.querySelector('#barcodeForm button[type="submit"]');
        if (generateButton) {
            generateButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.generateBarcode();
            });
        }
    }

    setupRangeInputs() {
        const rangeInputs = [
            { id: 'barcodeWidth', display: 'widthValue' },
            { id: 'barcodeHeight', display: 'heightValue' },
            { id: 'barcodeFontSize', display: 'fontSizeValue' },
            { id: 'bulkWidth', display: 'bulkWidthValue' },
            { id: 'bulkHeight', display: 'bulkHeightValue' },
            { id: 'bulkFontSize', display: 'bulkFontSizeValue' }
        ];

        rangeInputs.forEach(input => {
            const rangeInput = document.getElementById(input.id);
            const displayElement = document.getElementById(input.display);
            
            if (rangeInput && displayElement) {
                rangeInput.addEventListener('input', (e) => {
                    // For single barcode section, just show the value (px is outside the span)
                    // For bulk section, include px in the span content
                    if (input.id.startsWith('bulk')) {
                        const suffix = (input.id.includes('Height') || input.id.includes('FontSize')) ? 'px' : '';
                        displayElement.textContent = e.target.value + suffix;
                    } else {
                        // Single barcode section - just the value, px is in HTML
                        displayElement.textContent = e.target.value;
                    }
                });
            }
        });
    }

    setupNavigation() {
        // Handle navbar navigation
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href').substring(1);
                this.showSection(target);
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Handle card button navigation
        const cardButtons = document.querySelectorAll('.card .btn');
        cardButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const href = button.getAttribute('href');
                if (href) {
                    const target = href.substring(1);
                    this.showSection(target);
                    
                    // Update active nav link based on target
                    navLinks.forEach(l => l.classList.remove('active'));
                    const correspondingNavLink = document.querySelector(`.navbar-nav .nav-link[href="#${target}"]`);
                    if (correspondingNavLink) {
                        correspondingNavLink.classList.add('active');
                    }
                }
            });
        });

        // Handle logo click to return to home
        const logo = document.querySelector('.navbar-brand');
        if (logo) {
            logo.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSection('home');
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                const homeNavLink = document.querySelector('.navbar-nav .nav-link[href="#home"]');
                if (homeNavLink) {
                    homeNavLink.classList.add('active');
                }
            });
        }
    }

    showSection(sectionId) {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.display = 'none';
        });

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
            setTimeout(() => {
                targetSection.classList.add('visible');
            }, 100);
        }
    }

    generateBarcode() {
        console.log('Generate barcode called');
        const formData = this.getFormData();
        console.log('Form data:', formData);
        
        if (!this.validateFormData(formData)) {
            console.log('Form validation failed');
            return;
        }

        try {
            const container = document.getElementById('barcodeContainer');
            container.innerHTML = '';
            
            // Use fallback generator (bwip-js based)
            this.useFallbackGenerator(container, formData);
        } catch (error) {
            console.error('Error generating barcode:', error);
            this.showAlert('Error generating barcode: ' + error.message, 'danger');
        }
    }

    useFallbackGenerator(container, formData) {
        try {
            if (typeof SimpleBarcodeGenerator === 'undefined') {
                console.error('SimpleBarcodeGenerator not available');
                this.showAlert('No barcode generator available', 'danger');
                return;
            }

            const generator = new SimpleBarcodeGenerator();
            const canvas = generator.generateBarcode(container, formData.data, {
                format: formData.type,
                width: parseFloat(formData.width),
                height: parseInt(formData.height),
                displayValue: formData.displayValue,
                fontSize: parseInt(formData.fontSize),
                margin: 5, // Default margin
                background: '#ffffff', // Default white background
                lineColor: '#000000' // Default black foreground
            });

            this.currentBarcode = { canvas, formData };
            
            // Show the barcode preview
            const barcodePreview = document.getElementById('barcodePreview');
            
            if (barcodePreview) {
                barcodePreview.style.display = 'block';
            }
            
            this.showAlert('Barcode generated successfully!', 'success');
        } catch (error) {
            console.error('Fallback generator error:', error);
            this.showAlert('Failed to generate barcode: ' + error.message, 'danger');
        }
    }

    getFormData() {
        return {
            type: document.getElementById('barcodeType').value,
            data: document.getElementById('barcodeData').value,
            width: document.getElementById('barcodeWidth').value,
            height: document.getElementById('barcodeHeight').value,
            displayValue: document.getElementById('barcodeDisplayValue').checked,
            fontSize: document.getElementById('barcodeFontSize').value
        };
    }

        validateFormData(data) {
        if (!data.type || data.type === '') {
            this.showAlert('Please select a barcode type', 'warning');
            return false;
        }
        
        switch (data.type) {
            case 'CODE128':
            case 'CODE39':
            case 'QR':
                if (!data.data || data.data.trim() === '') {
                    this.showAlert('Please enter data for the barcode', 'warning');
                    return false;
                }
                break;
            default:
                this.showAlert('Please select a valid barcode type', 'warning');
                return false;
        }
        
        return true;
    }

    async handleFileUpload(file) {
        if (!file) return;

        try {
            const data = await this.readExcelFile(file);
            this.bulkData = data;
            this.populateDataColumnSelect(data);
            this.showDataPreview(data);
        } catch (error) {
            console.error('Error reading file:', error);
            this.showAlert('Error reading file: ' + error.message, 'danger');
        }
    }

    async readExcelFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    let jsonData;
                    
                    if (file.name.toLowerCase().endsWith('.csv')) {
                        // Handle CSV files
                        const csvText = e.target.result;
                        const lines = csvText.split('\n');
                        jsonData = lines.map(line => {
                            return line.split(',').map(cell => cell.trim().replace(/^["']|["']$/g, ''));
                        }).filter(row => row.length > 0 && row.some(cell => cell !== ''));
                    } else {
                        // Handle Excel files
                        const data = new Uint8Array(e.target.result);
                        const workbook = XLSX.read(data, { type: 'array' });
                        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                        jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
                    }
                    
                    if (jsonData.length === 0) {
                        reject(new Error('No data found in file'));
                        return;
                    }

                    resolve(jsonData);
                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = () => reject(new Error('Failed to read file'));
            
            if (file.name.toLowerCase().endsWith('.csv')) {
                reader.readAsText(file);
            } else {
                reader.readAsArrayBuffer(file);
            }
        });
    }

    populateDataColumnSelect(data) {
        const select = document.getElementById('dataColumn');
        select.innerHTML = '<option value="">Select column</option>';

        if (data.length > 0) {
            const headers = data[0];
            headers.forEach((header, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = header || `Column ${index + 1}`;
                select.appendChild(option);
            });
        }
    }

    showDataPreview(data) {
        const preview = document.getElementById('dataPreview');
        
        if (data.length === 0) {
            preview.innerHTML = '<p class="text-muted">No data found</p>';
            return;
        }

        const maxRows = Math.min(data.length, 10);
        let html = '<table class="table table-sm">';
        
        // Headers
        html += '<thead><tr>';
        data[0].forEach(header => {
            html += `<th>${header || 'Column'}</th>`;
        });
        html += '</tr></thead>';

        // Data rows
        html += '<tbody>';
        for (let i = 1; i < maxRows; i++) {
            html += '<tr>';
            data[i].forEach(cell => {
                html += `<td>${cell || ''}</td>`;
            });
            html += '</tr>';
        }
        html += '</tbody></table>';

        if (data.length > maxRows) {
            html += `<p class="text-muted">Showing ${maxRows} of ${data.length} rows</p>`;
        }

        preview.innerHTML = html;
    }

    processExcelFile() {
        const columnIndex = document.getElementById('dataColumn').value;
        
        if (!columnIndex || this.bulkData.length === 0) {
            this.showAlert('Please select a data column', 'warning');
            return;
        }

        const barcodeData = [];
        for (let i = 1; i < this.bulkData.length; i++) {
            const value = this.bulkData[i][columnIndex];
            if (value) {
                barcodeData.push(value.toString());
            }
        }

        if (barcodeData.length === 0) {
            this.showAlert('No valid data found in selected column', 'warning');
            return;
        }

        this.generateBulkBarcodes(barcodeData);
    }

    generateBulkBarcodes(data) {
        const container = document.getElementById('bulkBarcodes');
        container.innerHTML = '';

        const defaultSettings = {
            type: document.getElementById('bulkBarcodeType').value || 'CODE128',
            width: parseFloat(document.getElementById('bulkWidth').value) || 3,
            height: parseInt(document.getElementById('bulkHeight').value) || 18,
            displayValue: document.getElementById('bulkDisplayValue').checked,
            fontSize: parseInt(document.getElementById('bulkFontSize').value) || 12,
            margin: 5, // Default margin
            background: '#ffffff', // Default white background
            foreground: '#000000' // Default black foreground
        };

        data.forEach((item, index) => {
            const col = document.createElement('div');
            col.className = 'col-md-6 mb-3';
            
            const barcodeItem = document.createElement('div');
            barcodeItem.className = 'barcode-item text-center';
            
            try {
                // Use the fallback generator to create PNG canvases
                if (typeof SimpleBarcodeGenerator === 'undefined') {
                    barcodeItem.innerHTML = `<p class="text-danger small">Barcode generator not available: ${item}</p>`;
                } else {
                    const generator = new SimpleBarcodeGenerator();
                    const canvas = generator.generateBarcode(barcodeItem, item, {
                        format: defaultSettings.type,
                        width: parseFloat(defaultSettings.width),
                        height: parseInt(defaultSettings.height),
                        displayValue: defaultSettings.displayValue,
                        fontSize: parseInt(defaultSettings.fontSize),
                        margin: defaultSettings.margin,
                        background: defaultSettings.background,
                        lineColor: defaultSettings.foreground
                    });
                }
            } catch (error) {
                barcodeItem.innerHTML = `<p class="text-danger small">Error: ${item}</p>`;
            }

            col.appendChild(barcodeItem);
            container.appendChild(col);
        });

        document.getElementById('bulkResults').style.display = 'block';
        this.showAlert(`Generated ${data.length} barcodes successfully!`, 'success');
    }

    downloadBarcode() {
        const container = document.getElementById('barcodeContainer');
        const canvas = container.querySelector('canvas');
        
        if (!canvas) {
            this.showAlert('No barcode to download', 'warning');
            return;
        }

        try {
            // Crop canvas to content and download as PNG
            const croppedCanvas = this.cropCanvasToContent(canvas);
            croppedCanvas.toBlob(blob => {
                saveAs(blob, `barcode_${Date.now()}.png`);
            });
        } catch (error) {
            console.error('Error downloading barcode:', error);
            this.showAlert('Error downloading barcode', 'danger');
        }
    }

    cropCanvasToContent(canvas) {
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Find the bounds of the barcode content
        let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
        
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                const index = (y * canvas.width + x) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                
                // Check if pixel is not white (has content)
                if (r < 255 || g < 255 || b < 255) {
                    minX = Math.min(minX, x);
                    minY = Math.min(minY, y);
                    maxX = Math.max(maxX, x);
                    maxY = Math.max(maxY, y);
                }
            }
        }
        
        // Add 5px padding
        minX = Math.max(0, minX - 5);
        minY = Math.max(0, minY - 5);
        maxX = Math.min(canvas.width - 1, maxX + 5);
        maxY = Math.min(canvas.height - 1, maxY + 5);
        
        // Create new canvas with cropped content
        const croppedCanvas = document.createElement('canvas');
        const croppedCtx = croppedCanvas.getContext('2d');
        
        const width = maxX - minX + 1;
        const height = maxY - minY + 1;
        
        croppedCanvas.width = width;
        croppedCanvas.height = height;
        
        // Fill with white background
        croppedCtx.fillStyle = '#ffffff';
        croppedCtx.fillRect(0, 0, width, height);
        
        // Draw the cropped content
        croppedCtx.drawImage(canvas, minX, minY, width, height, 0, 0, width, height);
        
        return croppedCanvas;
    }



    printBarcode() {
        if (!this.currentBarcode) {
            this.showAlert('No barcode to print', 'warning');
            return;
        }

        const printWindow = window.open('', '_blank');
        const { canvas, formData } = this.currentBarcode;
        
        // Ensure canvas exists and has content
        if (!canvas || canvas.width === 0 || canvas.height === 0) {
            this.showAlert('Barcode canvas is empty', 'warning');
            return;
        }
        
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Barcode - ${formData.data}</title>
                    <style>
                        @page {
                            size: A4;
                            margin: 21.5mm 19mm 21.5mm 19mm;
                        }
                        
                        body { 
                            margin: 0; 
                            padding: 0; 
                            font-family: Arial, sans-serif;
                            font-size: 8pt;
                            text-align: center;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            min-height: 100vh;
                        }
                        
                        img { 
                            max-width: 53.3mm;
                            max-height: 25.4mm;
                            width: auto;
                            height: auto;
                            object-fit: contain;
                            display: block;
                            margin: 0 auto;
                        }
                    </style>
                </head>
                <body>
                    <img src="${canvas.toDataURL('image/png')}" alt="Barcode" onload="window.print();" />
                </body>
            </html>
        `);
        printWindow.document.close();
    }

    downloadAllBarcodes() {
        const barcodes = document.querySelectorAll('#bulkBarcodes canvas');
        if (barcodes.length === 0) {
            this.showAlert('No barcodes to download', 'warning');
            return;
        }

        // Download all barcodes as PNG files
        barcodes.forEach((canvas, index) => {
            // Crop canvas to content for optimal file size
            const croppedCanvas = this.cropCanvasToContent(canvas);
            croppedCanvas.toBlob(blob => {
                saveAs(blob, `barcode_${index + 1}.png`);
            });
        });
    }

    printAllBarcodes() {
        const barcodes = document.querySelectorAll('#bulkBarcodes .barcode-item');
        if (barcodes.length === 0) {
            this.showAlert('No barcodes to print', 'warning');
            return;
        }

        // Get selected template
        const templateSelect = document.getElementById('printTemplate');
        const selectedTemplate = templateSelect ? templateSelect.value : '';
        
        if (!selectedTemplate) {
            this.showAlert('Please select a paper template', 'warning');
            return;
        }
        
        const template = this.paperTemplates[selectedTemplate];
        if (!template) {
            this.showAlert('Selected template not found', 'error');
            return;
        }

        // Check if template has barcode type restrictions
        if (template.supportedBarcodeTypes) {
            const selectedBarcodeType = document.getElementById('bulkBarcodeType').value;
            if (!template.supportedBarcodeTypes.includes(selectedBarcodeType)) {
                this.showAlert(`Template "${template.name}" only supports: ${template.supportedBarcodeTypes.join(', ')}`, 'warning');
                return;
            }
        }

        const printWindow = window.open('', '_blank');
        let html = `
            <html>
                <head>
                    <title>Print All Barcodes - ${template.name}</title>
                    <style>
                        ${template.css}
                    </style>
                </head>
                <body>
                    <div style="width: 100%; height: 100%; overflow: hidden;">
        `;

        // Convert canvas elements to images for printing
        barcodes.forEach((item, index) => {
            const canvas = item.querySelector('canvas');
            if (canvas && canvas.width > 0 && canvas.height > 0) {
                const img = document.createElement('img');
                img.src = canvas.toDataURL('image/png');
                img.alt = `Barcode ${index + 1}`;
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
                
                const barcodeDiv = document.createElement('div');
                barcodeDiv.className = 'barcode-item';
                barcodeDiv.appendChild(img);
                
                html += barcodeDiv.outerHTML;
            } else {
                // Add placeholder for missing barcode
                const barcodeDiv = document.createElement('div');
                barcodeDiv.className = 'barcode-item';
                barcodeDiv.innerHTML = `<p style="color: red;">Barcode ${index + 1} - Error</p>`;
                html += barcodeDiv.outerHTML;
            }
        });

        html += `
                </div>
            </body>
        </html>`;
        
        printWindow.document.write(html);
        printWindow.document.close();
        
        // Wait for images to load before showing print dialog
        printWindow.onload = function() {
            setTimeout(() => {
                printWindow.print();
            }, 500);
        };
    }

    showAlert(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.appendChild(alertDiv);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
}

// Global functions for HTML onclick handlers
function downloadBarcode() {
    tagForge.downloadBarcode();
}

function printBarcode() {
    tagForge.printBarcode();
}

function processExcelFile() {
    tagForge.processExcelFile();
}

function downloadAllBarcodes() {
    tagForge.downloadAllBarcodes();
}

function printAllBarcodes() {
    tagForge.printAllBarcodes();
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.tagForge = new TagForge();
}); 