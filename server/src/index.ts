import expresss from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { PrismaClient } from "@prisma/client";

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
    cb(null, file.fieldname + "-" + uniqueSuffix + ".pdf");
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
app.post("/upload", upload.single("pdf"), async (req, res) => {
  // Aqui vou salvar o arquivo no banco de dados
  // e retornar o id do arquivo salvo
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Arquivo não enviado" });
    }

    const { originalname, path } = req.file;

    const file = await prisma.file.create({
      data: {
        name: originalname,
        path: path,
      },
    });

    res.send(file).status(200);
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
