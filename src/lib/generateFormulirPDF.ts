import jsPDF from 'jspdf';

export function generateFormulirPDF() {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let y = 15;

    // ===== HEADER =====
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('YAYASAN AL KAUSAR', pageWidth / 2, y, { align: 'center' });
    y += 6;
    doc.setFontSize(14);
    doc.text('SEKOLAH MENENGAH ATAS', pageWidth / 2, y, { align: 'center' });
    y += 7;
    doc.setFontSize(16);
    doc.text('INSAN CENDEKIA AL KAUSAR', pageWidth / 2, y, { align: 'center' });
    y += 6;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('STATUS : TERAKREDITASI "A"', pageWidth / 2, y, { align: 'center' });
    y += 5;
    doc.setFontSize(7);
    doc.text('SK. BADAN AKREDITASI PROVINSI SEKOLAH/MADRASAH NO. 02.00/141/BAP-SM/XII/2007', pageWidth / 2, y, { align: 'center' });

    // Line separator
    y += 4;
    doc.setLineWidth(0.8);
    doc.line(margin, y, pageWidth - margin, y);
    y += 1;
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);

    // ===== TITLE =====
    y += 10;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('FORMULIR PENDAFTARAN SISWA BARU SMA', pageWidth / 2, y, { align: 'center' });

    // ===== Tahun Pelajaran & No. Pendaftaran =====
    y += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Tahun Pelajaran : ............... M', margin, y);
    doc.text('No. Pendaftaran : ......................', pageWidth / 2 + 10, y);
    y += 6;
    doc.text('                         ............... H', margin, y);
    doc.text('No. Test             : ......................', pageWidth / 2 + 10, y);

    // ===== I. DATA CALON SISWA =====
    y += 12;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('I. DATA CALON SISWA', margin, y);

    const labelX = margin + 8;
    const colonX = margin + 70;
    const valueX = colonX + 4;
    const lineEndX = pageWidth - margin;

    const drawField = (num: string, label: string, yPos: number, extraInfo?: string) => {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(`${num}.`, labelX, yPos);
        doc.text(label, labelX + 8, yPos);
        doc.text(':', colonX, yPos);
        // Dotted line for filling
        doc.setLineDashPattern([1, 1], 0);
        doc.line(valueX, yPos, lineEndX, yPos);
        doc.setLineDashPattern([], 0);
        if (extraInfo) {
            doc.setFontSize(8);
            doc.text(extraInfo, valueX, yPos);
        }
    };

    y += 8;
    drawField('1', 'Nama lengkap', y);
    y += 8;
    drawField('2', 'Nama panggilan', y);
    y += 8;

    // Jenis kelamin with checkboxes
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('3.', labelX, y);
    doc.text('Jenis kelamin', labelX + 8, y);
    doc.text(':', colonX, y);
    // Checkbox Laki-laki
    doc.rect(valueX + 5, y - 3.5, 4, 4);
    doc.text('Laki-laki', valueX + 12, y);
    // Checkbox Perempuan
    doc.rect(valueX + 40, y - 3.5, 4, 4);
    doc.text('Perempuan', valueX + 47, y);

    y += 8;
    drawField('4', 'Tempat, tanggal lahir', y);
    y += 8;
    drawField('5', 'Agama', y);
    y += 8;
    drawField('6', 'Cita-cita', y);
    y += 8;
    drawField('7', 'Hoby', y);
    y += 8;
    drawField('8', 'Kewarganegaraan', y);
    y += 8;
    drawField('9', 'Anak ke', y);
    y += 8;
    drawField('10', 'Jumlah saudara kandung', y);
    y += 8;
    drawField('11', 'Jumlah saudara tiri', y);
    y += 8;
    drawField('12', 'Jumlah saudara angkat', y);
    y += 8;
    drawField('13', 'Anak yatim/piatu/yatim piatu', y);
    y += 8;
    drawField('14', 'Bahasa sehari-hari di rumah', y);

    // ===== II. KETERANGAN TEMPAT TINGGAL =====
    y += 12;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('II. KETERANGAN TEMPAT TINGGAL', margin, y);

    y += 8;
    drawField('1', 'Alamat Rumah', y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('RT : ..........   RW : ..........', valueX, y);
    y += 6;
    doc.text('Kelurahan', labelX + 8, y);
    doc.text(':', colonX, y);
    doc.setLineDashPattern([1, 1], 0);
    doc.line(valueX, y, lineEndX, y);
    doc.setLineDashPattern([], 0);
    y += 6;
    doc.text('Kecamatan', labelX + 8, y);
    doc.text(':', colonX, y);
    doc.setLineDashPattern([1, 1], 0);
    doc.line(valueX, y, lineEndX, y);
    doc.setLineDashPattern([], 0);
    y += 8;
    drawField('2', 'Kota/Kabupaten', y);
    y += 8;
    drawField('3', 'Propinsi', y);
    y += 6;
    doc.text('Kode Pos', labelX + 8, y);
    doc.text(':', colonX, y);
    doc.setLineDashPattern([1, 1], 0);
    doc.line(valueX, y, lineEndX, y);
    doc.setLineDashPattern([], 0);
    y += 6;
    doc.text('No. Telpon/Fax', labelX + 8, y);
    doc.text(':', colonX, y);
    doc.setLineDashPattern([1, 1], 0);
    doc.line(valueX, y, lineEndX, y);
    doc.setLineDashPattern([], 0);
    y += 6;
    doc.text('E-mail', labelX + 8, y);
    doc.text(':', colonX, y);
    doc.setLineDashPattern([1, 1], 0);
    doc.line(valueX, y, lineEndX, y);
    doc.setLineDashPattern([], 0);

    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('4.', labelX, y);
    doc.text('Tinggal dengan', labelX + 8, y);
    doc.text(':', colonX, y);
    // Checkboxes
    doc.rect(valueX + 5, y - 3.5, 4, 4);
    doc.text('Orang Tua', valueX + 12, y);
    doc.rect(valueX + 40, y - 3.5, 4, 4);
    doc.text('Asrama', valueX + 47, y);
    doc.rect(valueX + 70, y - 3.5, 4, 4);
    doc.text('Saudara', valueX + 77, y);

    // ===== PAGE 2 =====
    doc.addPage();
    y = 20;

    // ===== III. DATA ORANG TUA =====
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('III. DATA ORANG TUA / WALI', margin, y);

    // A. Ayah
    y += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('A. Ayah', margin + 4, y);

    y += 8;
    drawField('1', 'Nama lengkap', y);
    y += 8;
    drawField('2', 'Tempat, tanggal lahir', y);
    y += 8;
    drawField('3', 'Agama', y);
    y += 8;
    drawField('4', 'Pendidikan terakhir', y);
    y += 8;
    drawField('5', 'Pekerjaan', y);
    y += 8;
    drawField('6', 'Penghasilan per bulan', y);
    y += 8;
    drawField('7', 'No. HP', y);

    // B. Ibu
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text('B. Ibu', margin + 4, y);

    y += 8;
    drawField('1', 'Nama lengkap', y);
    y += 8;
    drawField('2', 'Tempat, tanggal lahir', y);
    y += 8;
    drawField('3', 'Agama', y);
    y += 8;
    drawField('4', 'Pendidikan terakhir', y);
    y += 8;
    drawField('5', 'Pekerjaan', y);
    y += 8;
    drawField('6', 'Penghasilan per bulan', y);
    y += 8;
    drawField('7', 'No. HP', y);

    // C. Wali (jika ada)
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text('C. Wali (jika tidak tinggal dengan orang tua)', margin + 4, y);

    y += 8;
    drawField('1', 'Nama lengkap', y);
    y += 8;
    drawField('2', 'Tempat, tanggal lahir', y);
    y += 8;
    drawField('3', 'Agama', y);
    y += 8;
    drawField('4', 'Pendidikan terakhir', y);
    y += 8;
    drawField('5', 'Pekerjaan', y);
    y += 8;
    drawField('6', 'Hubungan dengan siswa', y);
    y += 8;
    drawField('7', 'Alamat', y);
    y += 8;
    drawField('8', 'No. HP', y);

    // ===== IV. PERNYATAAN =====
    y += 12;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('IV. PERNYATAAN', margin, y);
    y += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const pernyataan = 'Dengan ini saya menyatakan bahwa data yang saya isi di atas adalah benar adanya. Apabila di kemudian hari ditemukan data yang tidak benar, saya bersedia menerima sanksi sesuai ketentuan yang berlaku.';
    const lines = doc.splitTextToSize(pernyataan, contentWidth - 10);
    doc.text(lines, margin + 5, y);
    y += lines.length * 5 + 5;

    // Tanda tangan
    y += 5;
    doc.text('..................., ........ / ........ / ................', pageWidth - margin - 70, y);
    y += 15;

    // Orang tua / Wali
    doc.text('Orang Tua / Wali', margin + 15, y);
    doc.text('Calon Siswa', pageWidth - margin - 35, y);
    y += 25;

    // Lines for names
    doc.text('(........................................)', margin + 5, y);
    doc.text('(........................................)', pageWidth - margin - 55, y);

    // Save the PDF
    doc.save('Formulir_Pendaftaran_Siswa_Baru_SMA.pdf');
}
