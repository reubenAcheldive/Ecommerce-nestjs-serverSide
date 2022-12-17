import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { FallbackExceptionFilter } from "./filters/fallback.filter";
import { HttpExceptionFilter } from "./filters/http-exeption.filter";
import { AllExceptionsFilter } from "./filters/mongoose.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: "*" });
  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new FallbackExceptionFilter(),
    new HttpExceptionFilter()
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: { target: true },
    })
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
