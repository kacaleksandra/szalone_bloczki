package pl.szalone.bloczki.service.schematic;

import io.javalin.Javalin;
import io.javalin.http.HttpStatus;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import pl.szalone.bloczki.domain.AppEntity;
import pl.szalone.bloczki.domain.schematic.Schematic;
import pl.szalone.bloczki.domain.schematic.dto.FetchSchematicDto;
import pl.szalone.bloczki.domain.schematic.dto.PostSchematicDto;
import pl.szalone.bloczki.domain.user.User;
import pl.szalone.bloczki.exception.RestException;
import pl.szalone.bloczki.repository.AppRepository;
import pl.szalone.bloczki.repository.schematic.SchematicRepository;
import pl.szalone.bloczki.util.AppComponentLocator;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class SchematicServiceImpl implements SchematicService {

  private SchematicRepository schematicRepository;

  @Override
  public void doRegisterService(Javalin app, AppComponentLocator<AppRepository<? extends AppEntity, Long>> locator) {
    this.schematicRepository = locator.findComponent(SchematicRepository.class);
  }

  @Override
  public List<FetchSchematicDto> getSchematics(User user) {
    return schematicRepository.findByUser(user)
        .stream()
        .map(Schematic::toFetchDto)
        .collect(Collectors.toList());
  }

  @Override
  public FetchSchematicDto postSchematic(User user, PostSchematicDto dto) {
    Optional<Schematic> optional = schematicRepository.findByDataAndUser(dto.getData(), user);
    if(optional.isPresent()) {
      throw new RestException(HttpStatus.BAD_REQUEST, "Schemat jest juz zapisany.");
    }
    return new Schematic()
        .setData(dto.getData())
        .setUser(user)
        .save(schematicRepository)
        .toFetchDto();
  }

  @Override
  public boolean deleteSchematic(User user, long id) {
    Schematic schematic = schematicRepository.findById(id)
        .orElseThrow(() -> new RestException(HttpStatus.BAD_REQUEST, "Schemat o takim id nie istnieje."));
    if(!schematic.getUser().equals(user)) {
      throw new RestException(HttpStatus.BAD_REQUEST, "Nie mozesz usunac cudzego schematu.");
    }
    schematicRepository.delete(schematic);
    return true;
  }

  @Override
  public byte[] doConvertImageToPdf(byte[] image) {
    return new byte[0];
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
