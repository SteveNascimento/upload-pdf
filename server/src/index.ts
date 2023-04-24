import expresss from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { PrismaClient } from "@prisma/client";
import fs from "fs";

const app = expresss();
const port = 5000;

app.use(expresss.json());
app.use(cors());

const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

const uploadDir = path.join(__dirname, "/uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "-" + uniqueSuffix + ".pdf");
  },
});

const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(pdf)$/)) {
      return cb(new Error("Por favor, envie um arquivo em PDF."));
    }

    cb(null, true);
  },
  storage: storage,
});

// rota de upload
app.post("/upload", upload.array("file"), async (req, res) => {
  // Aqui vou salvar o arquivo no banco de dados
  // e retornar o id do arquivo salvo
  try {
    // Verifica se veio com arquivo
    // Se não veio, retorna erro

    // Se vier com arquivo, salva no banco
    const files = req.files as Express.Multer.File[];

    const promises = files.map(async (file) => {
      const fileSaved = await prisma.file.create({
        data: {
          name: file.filename,
          path: file.path,
        },
      });

      return fileSaved;
    });

    const filesSaved = await Promise.all(promises);

    return res.json(filesSaved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao fazer upload do arquivo" });
  }
});

// rota de download
app.get("/download/:id", async (req, res) => {
  // Aqui vou buscar o arquivo no banco de dados
  // e retornar o arquivo para o usuário
  try {
    const { id } = req.params;

    const file = await prisma.file.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!file) {
      return res.status(404).json({ error: "Arquivo não encontrado" });
    }

    return res.download(file.path);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao fazer download do arquivo" });
  }
});

// rota de listagem
app.get("/files", async (req, res) => {
  // Aqui vou buscar todos os arquivos no banco de dados
  // e retornar para o usuário
  try {
    const files = await prisma.file.findMany();

    return res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar os arquivos" });
  }
});

// rota de exclusão
app.delete("/files/:id", async (req, res) => {
  // Aqui vou buscar o arquivo no banco de dados
  // e excluir o arquivo do banco e do disco
  try {
    const { id } = req.params;

    const file = await prisma.file.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!file) {
      return res.status(404).json({ error: "Arquivo não encontrado" });
    }

    await prisma.file.delete({
      where: {
        id: Number(id),
      },
    });

    // Exclui o arquivo do disco
    fs.unlinkSync(file.path);

    return res.json({ message: "Arquivo excluído com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir o arquivo" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
