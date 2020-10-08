import { BadRequestException, Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { degrees, PDFDocument, PDFImage } from 'pdf-lib';
import { deleteFolderContents } from 'src/utils/delete.folder';

@Injectable()
export class UploadsService {
    async convertImagesToPDF(filepaths: any[]) {
        /**
         * Implement this function, take the code from the controller and then only return a proper response.
         */
        const pdfPath = join(__dirname, '../..', 'public/pdf');
        const pdfDoc = await PDFDocument.create();
        const imagePaths = filepaths.map(file => {
            return join(__dirname, '../..', file.path);
        });

        /**
         * Draws each image onto the PDF
         */
        for (let i = 0; i < filepaths.length; i++) {
            const mimetype = filepaths[i].mimetype;
            let img: undefined | PDFImage = undefined;
            if (mimetype === 'image/jpeg' || mimetype === 'image/jpg')
                img = await pdfDoc.embedJpg(readFileSync(imagePaths[i]));
            if (mimetype === 'image/png')
                img = await pdfDoc.embedPng(readFileSync(imagePaths[i]));


            if (img) {
                /**
                 * TODO: Figure out how to make images properly rotate (specifically phone images)
                 */
                const imagePage = pdfDoc.insertPage(i);
                imagePage.setWidth(1080)
                imagePage.setHeight(1920)

                imagePage.drawImage(img, {
                    rotate: degrees(270),
                    
                    // x: imagePage.getHeight(),
                    // y: imagePage.getWidth(),
                    // width: imagePage.getHeight(),
                    // height: imagePage.getWidth(),
                    x: 0,
                    y: imagePage.getHeight(),
                    width: imagePage.getHeight(),
                    height: imagePage.getWidth(),
                });
            }
        }

        const pdfBytes = await pdfDoc.save();
        writeFileSync(`${pdfPath}/${new Date().getTime()}.pdf`, pdfBytes);

        deleteFolderContents(join(__dirname, '../..', 'public/temp'));
    }
}
