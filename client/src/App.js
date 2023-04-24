import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, List, Upload, message, notification } from "antd";

import { UploadOutlined } from "@ant-design/icons";

function App() {
  //List and Download

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const getFiles = async () => {
    setLoading(true);
    axios.get("http://localhost:5000/files").then((response) => {
      if (response.data) {
        setList(response.data);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    getFiles();
  }, []);

  //Upload

  const [fileList, setFileList] = useState([]);

  const handleUpload = async () => {
    setUploading(true);
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("pdf", file);
      formData.append("name", file.name);
      formData.append("type", file.type);
      formData.append("size", file.size);
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
      setFileList([]);
      setUploading(false);
      getFiles();
    }
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
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
      <Card
        title="Lista de arquivos"
        style={{
          width: 300,
          alignSelf: "center",
          marginTop: 10,
        }}
      >
        <List
          style={{
            maxWidth: 500,
          }}
          loading={loading}
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta description={item.name} />
              <Button
                type="primary"
                onClick={() => {
                  window.open(
                    `http://localhost:5000/download/${item.id}`,
                    "_blank"
                  );
                }}
              >
                Download
              </Button>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}

export default App;
