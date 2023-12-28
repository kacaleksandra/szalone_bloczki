package pl.szalone.bloczki.service.schematic;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class SchematicServiceImpl implements SchematicService {

  @Override
  public byte[] doConvertImageToPdf(byte[] imageBytes)
  {
    try {
      PDDocument doc = new PDDocument();
      PDPage page = new PDPage();
      doc.addPage(page);

      PDImageXObject pdImage = PDImageXObject.createFromByteArray(doc, bufferedImageToByteArray(image), "image");
      PDPageContentStream contentStream = new PDPageContentStream(doc, page);

      // skalowanie obrazka
      float imgWidth = pdImage.getWidth();
      float imgHeight = pdImage.getHeight();
      float pageWidth = page.getMediaBox().getWidth();
      float pageHeight = page.getMediaBox().getHeight();
      float scale = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
      float scaledWidth = imgWidth * scale;
      float scaledHeight = imgHeight * scale;
      float x = (pageWidth - scaledWidth) / 2;
      float y = (pageHeight - scaledHeight) / 2;
      contentStream.drawImage(pdImage, x, y, scaledWidth, scaledHeight);
      contentStream.close();

      ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
      doc.save(byteArrayOutputStream);
      doc.close();

      return byteArrayOutputStream.toByteArray();
    } catch (IOException e) {
      e.printStackTrace();
      return null;
    }
  }

  private static byte[] bufferedImageToByteArray(BufferedImage image) throws IOException {
    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
    ImageIO.write(image, "jpg", byteArrayOutputStream);
    return byteArrayOutputStream.toByteArray();
  }
}
