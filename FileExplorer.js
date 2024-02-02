import React, { useState } from 'react';

function FileExplorer() {
  const [fileStructure, setFileStructure] = useState({
    folders: [
      { name: 'Gallery', expanded: false, files: [], subfolders: [], addingFile: false, newFileName: '', addingFolder: false, newFolderName: '' }
    ]
  });

  const handleFolderClick = (folderIndex) => {
    setFileStructure(prevState => ({
      ...prevState,
      folders: prevState.folders.map((folder, index) => {
        if (index === folderIndex) {
          return { ...folder, expanded: !folder.expanded };
        }
        return folder;
      })
    }));
  };

  const handleAddFile = (folderIndex) => {
    setFileStructure(prevState => ({
      ...prevState,
      folders: prevState.folders.map((folder, index) => {
        if (index === folderIndex) {
          return { ...folder, addingFile: true };
        }
        return folder;
      })
    }));
  };

  const handleCreateFile = (folderIndex) => {
    setFileStructure(prevState => ({
      ...prevState,
      folders: prevState.folders.map((folder, index) => {
        if (index === folderIndex && folder.newFileName.trim() !== '') {
          return { ...folder, files: [...folder.files, folder.newFileName.trim()], addingFile: false, newFileName: '' };
        }
        return folder;
      })
    }));
  };

  const handleDeleteFile = (folderIndex, fileName) => {
    setFileStructure(prevState => ({
      ...prevState,
      folders: prevState.folders.map((folder, index) => {
        if (index === folderIndex) {
          return { ...folder, files: folder.files.filter(file => file !== fileName) };
        }
        return folder;
      })
    }));
  };

  const handleInputChange = (e, folderIndex) => {
    const { value } = e.target;
    
    setFileStructure(prevState => ({
      ...prevState,
      folders: prevState.folders.map((folder, index) => {
        if (index === folderIndex) {
          return { ...folder, newFileName: value };
        }
        return folder; 
      })
    }));
  };

  const handleAddFolder = (folderIndex) => {
    setFileStructure(prevState => ({
      ...prevState,
      folders: prevState.folders.map((folder, index) => {
        if (index === folderIndex) {
          return { ...folder, addingFolder: true };
        }
        return folder;
      })
    }));
  };

  const handleCreateFolder = (folderIndex) => {
    setFileStructure(prevState => {
      const newFolders = [...prevState.folders];
    
      const newFolderName = prevState.folders[folderIndex].newFolderName.trim();
     
      if (newFolderName !== '') {
          console.log(newFolderName);
        // Create a new folder object instead of mutating the existing one
        const newSubfolders = [...newFolders[folderIndex].subfolders, { name: newFolderName, expanded: false, files: [], addingFile: false, newFileName: '', addingFolder: false, newFolderName: '' }];
        // Create a new folder at the specified index with the updated subfolders array
        newFolders[folderIndex] = { ...newFolders[folderIndex], subfolders: newSubfolders };
      }
      return { ...prevState, folders: newFolders };
    });
  };

  const handleInputChangeFolder = (e, folderIndex) => {
    const { value } = e.target;
 
    setFileStructure(prevState => ({
      ...prevState,
      folders: prevState.folders.map((folder, index) => {
        if (index === folderIndex) {
          return { ...folder, newFolderName: value };
        }
        return folder;
      })
    }));
  };

  const handleRenameFolder = (folderIndex) => {
    setFileStructure(prevState => ({
      ...prevState,
      folders: prevState.folders.map((folder, index) => {
        if (index === folderIndex) {
          return { ...folder, renamingFolder: true };
        }
        return folder;
      })
    }));
  };

  const handleRenameFolderConfirm = (folderIndex) => {
    setFileStructure(prevState => {
      const newFolders = [...prevState.folders];
      newFolders[folderIndex].name = prevState.folders[folderIndex].newFolderName.trim();
      newFolders[folderIndex].renamingFolder = false;
      return { ...prevState, folders: newFolders };
    });
  };

  return (
    <div className="file-explorer">
      {fileStructure.folders.map((folder, index) => (
        <div className="folder" key={index} onContextMenu={(e) => e.preventDefault()}>
          <div className="folder-header" onClick={() => handleFolderClick(index)}>
            {folder.expanded ? '-' : '+'} {folder.name}
          </div>
          {folder.expanded && (
            <div className="folder-content">
              {folder.files.map((file, fileIndex) => (
                <div className="file" key={fileIndex}>
                  {file} <button onClick={() => handleDeleteFile(index, file)}>Delete</button>
                </div>
              ))}
              {folder.addingFile && (
                <input type="text" value={folder.newFileName} onChange={(e) => handleInputChange(e, index)} />
              )}
              {folder.addingFolder && (
                <input type="text" value={folder.newFolderName} onChange={(e) => handleInputChangeFolder(e, index)} />
              )}
              <div className='menu'>
                {!folder.addingFile && (
                  <button onClick={() => handleAddFile(index)}>
                    Add File
                  </button>
                )}
                {!folder.addingFolder && (
                  <button onClick={() => handleAddFolder(index)}>
                    New Folder
                  </button>
                )}
                <button onClick={() => handleRenameFolder(index)}>Rename Folder</button>
                {folder.addingFile && (
                  <button onClick={() => handleCreateFile(index)}>
                    Create File
                  </button>
                )}
                {folder.addingFolder && (
                  <button onClick={() => handleCreateFolder(index)}>
                    Create Folder
                  </button>
                )}
                {folder.renamingFolder && (
                  <button onClick={() => handleRenameFolderConfirm(index)}>
                    Confirm Rename
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FileExplorer;
