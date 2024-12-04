import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Указываем директорию для сохранения файлов
const uploadDir = path.join(process.cwd(), "public/images");

// Убедись, что директория для загрузки существует
async function ensureUploadDirExists() {
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }
}

export async function POST(req: Request) {
  try {
    await ensureUploadDirExists();

    // Получаем данные из запроса
    const formData = await req.formData();
    const files = formData.getAll("image") as File[];

    if (files.length === 0) {
      return NextResponse.json(
        { success: false, message: "No files uploaded" },
        { status: 400 }
      );
    }

    const filePaths: string[] = [];

    // Проходим по всем файлам и сохраняем их на диск
    for (const file of files) {
      const fileName = file.name.split(" ").join(""); // Убираем пробелы из имени файла
      const filePath = path.join(uploadDir, fileName);

      // Сохраняем файл на диск
      const buffer = await file.arrayBuffer();
      await fs.writeFile(filePath, Buffer.from(buffer));

      // Добавляем путь для доступа к файлу
      filePaths.push(`/images/${fileName}`);
    }

    return NextResponse.json({
      success: true,
      message: "Images uploaded successfully",
      data: filePaths,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
