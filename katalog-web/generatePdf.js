import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const doc = new PDFDocument({ margin: 50 });
const outputPath = path.join(__dirname, 'public', 'assets', 'perawatan', 'LHALA PEEL TREATMENT.pdf');

// Ensure directory exists
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

doc.pipe(fs.createWriteStream(outputPath));

// Title Page
doc.fontSize(24).font('Helvetica-Bold').text('LHALA PEEL TREATMENT', { align: 'center' });
doc.moveDown(2);
doc.fontSize(14).font('Helvetica').text('enef clinic', { align: 'center' });
doc.addPage();

// Content
doc.fontSize(20).font('Helvetica-Bold').text('LHALA PEEL 1', { continued: true }).text(' - Rp 299.000', { align: 'right' });
doc.moveDown(0.5);
doc.fontSize(14).font('Helvetica-Oblique').text('Lhala peel Only');
doc.moveDown(0.5);
doc.fontSize(12).font('Helvetica')
   .list([
     'Mengangkat sel kulit mati dengan lembut',
     'Membantu mencerahkan kulit kusam',
     'Kulit tampak lebih halus & bercahaya',
     'Nyaman tanpa downtime'
   ]);
doc.moveDown(2);

doc.fontSize(20).font('Helvetica-Bold').text('LHALA PEEL 2', { continued: true }).text(' - Rp 350.000', { align: 'right' });
doc.moveDown(0.5);
doc.fontSize(14).font('Helvetica-Oblique').text('Facial Whitening + LHALA Peel');
doc.moveDown(0.5);
doc.fontSize(12).font('Helvetica')
   .list([
     'Membersihkan kulit secara menyeluruh',
     'Mengangkat sel kulit mati',
     'Membantu mencerahkan & meratakan warna kulit',
     'Kulit tampak lebih glowing'
   ]);
doc.moveDown(2);

doc.fontSize(20).font('Helvetica-Bold').text('LHALA PEEL 3', { continued: true }).text(' - Rp 425.000', { align: 'right' });
doc.moveDown(0.5);
doc.fontSize(14).font('Helvetica-Oblique').text('Facial Whitening + LHALA Peel + Laser DPL Skin Rejuvenation');
doc.moveDown(0.5);
doc.fontSize(12).font('Helvetica')
   .list([
     'Membantu mencerahkan kulit',
     'Membantu meratakan warna kulit',
     'Kulit tampak lebih halus & glowing',
     'Mendukung hasil skin rejuvenation'
   ]);
doc.moveDown(2);

doc.fontSize(20).font('Helvetica-Bold').text('LHALA PEEL 4', { continued: true }).text(' - Rp 399.000', { align: 'right' });
doc.moveDown(0.5);
doc.fontSize(14).font('Helvetica-Oblique').text('Facial Whitening + Detox Wajah + LHALA Peel');
doc.moveDown(0.5);
doc.fontSize(12).font('Helvetica')
   .list([
     'Membersihkan kulit secara mendalam',
     'Mengangkat sel kulit mati & kotoran',
     'Membuat kulit terasa lebih segar',
     'Kulit tampak lebih sehat & bercahaya'
   ]);

doc.end();
console.log('PDF generated successfully at ' + outputPath);
