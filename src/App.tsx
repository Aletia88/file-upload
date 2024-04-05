import React, { useState } from 'react';
import './App.css';
import { FileInput, rem, Table, Button } from '@mantine/core';
import { CiFileOn } from "react-icons/ci";
import '@mantine/core/styles.css';

interface UploadedFile {
  name: string;
  size: string;
  date: string;
}

function App() {
  const icon = <CiFileOn style={{ width: rem(18), height: rem(18) }} />;
  
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="App">
      <div className='w-1/3 m-5'>
        <FileInput
          rightSection={icon}
          label="Upload File"
          placeholder="Upload File With Lessthan 10mb"
          rightSectionPointerEvents="none"
          mt="md"
          onChange={(payload: File | null) => {
            if (payload) {

              if (payload.size > 10 * 1024 * 1024) {
                // File size exceeds the limit, notify the user
                alert("File size must be less than 10MB");
                return;
              }
              // Handle when a single file is uploaded
              const file = payload;
              const processedFile: UploadedFile = {
                name: file.name,
                size: `${(file.size / 1000000).toFixed(2)}MB`,
                date: new Date().toISOString().split('T')[0],
              };
              setFiles((prevFiles) => [...prevFiles, processedFile]);
            } else {
              // Handle when no file is uploaded
              console.log("No file uploaded");
            }
          }}
        />
      </div>

      <Table.ScrollContainer minWidth={500} m="5%">
        <Table striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>File Name</Table.Th>
              <Table.Th>File Size</Table.Th>
              <Table.Th>Uploaded Date</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {files.map((file, index) => (
              <Table.Tr key={index}>
                <Table.Td>{file.name}</Table.Td>
                <Table.Td>{file.size}</Table.Td>
                <Table.Td>{file.date}</Table.Td>
                <Table.Td>
                  <Button color='red' onClick={() => handleRemoveFile(index)}>Remove File</Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}

export default App;
