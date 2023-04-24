import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, List, Upload, message, notification } from "antd";

import { UploadOutlined } from "@ant-design/icons";

function App() {
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState([]);
  // estado dos arquivos no servidor
  const [files, setFiles] = useState([]);
  useEffect(() => {
    getFiles();
  }, []);

  const getFiles = async () => {
    axios.get("http://localhost:5000/files").then((response) => {
      if (response.data) {
        setFileList(
          response.data.map((file) => ({
            name: file.name,
            uid: file.id,
            url: `http://localhost:5000/download/${file.id}`,
            createdAt: file.createdAt,
            updatedAt: file.updatedAt,
          }))
        );
        setFiles(response.data.map((file) => file.id));
      }
      console.log(response.data);
    });
  };

  const handleUpload = async () => {
    setUploading(true);
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("file", file);
    });
    try {
      await axios.post("http://localhost:5000/upload", formData);
      notification.success({
        message: "Sucesso",
        description: "Arquivo enviado com sucesso",
      });
    } catch (error) {
      message.error(error);
    } finally {
      setUploading(false);
      getFiles();
    }
  };

  const deleteFile = async (file) => {
    try {
      await axios.delete(`http://localhost:5000/files/${file.uid}`);
      notification.success({
        message: "Sucesso",
        description: "Arquivo deletado com sucesso",
      });
    } catch (error) {
      message.error(error);
    } finally {
      getFiles();
    }
  };

  const props = {
    onRemove: (file) => {
      // Se existe o arquivo no servidor, deleta
      if (files.includes(file.uid)) {
        deleteFile(file);
        setFileList([]);
      } else {
        setFileList([]);
      }
    },
    beforeUpload: (file) => {
      if (fileList.length >= 1) {
        message.error("Você só pode enviar um arquivo");
        return false;
      }
      setFileList([file]);
      return false;
    },
    fileList,
    defaultFileList: [...fileList].map((file) => ({
      uid: file.id,
      name: file.name,
      status: "done",
      url: `http://localhost:5000/download/${file.id}`,
    })),
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Card
        title="Teste"
        style={{
          width: 300,
          alignSelf: "center",
        }}
      >
        <div>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Selecione um arquivo</Button>
          </Upload>
          <Button
            type="primary"
            onClick={handleUpload}
            style={{
              marginTop: 10,
            }}
            loading={uploading}
          >
            Enviar
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default App;
