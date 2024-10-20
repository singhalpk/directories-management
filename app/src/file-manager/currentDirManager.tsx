import React from 'react';
import {
  IconAddFile,
  IconAddFolder,
  IconDelete,
  IconDownArrow,
  IconEdit,
  IconGrid,
  IconList,
  IconUpArrow,
} from '../components/icons';
import DirCard from './dirCard';
import { CurrentDirectoryManagerProps, useDirectoryManage } from '../hooks/useDirectoryManage';

const CurrentDirectoryManager = ({
  currentDirectory,
  setCurrentDirectory,
  searchQuery,
}: CurrentDirectoryManagerProps) => {
  const {
    listView,
    handleListView,
    handleGridView,
    handleDirectoryClick,
    editDirName,
    updateDirName,
    selected,
    editDir,
    dirItems,
    isSortAsc,
    addFile,
    addFolder,
    sort,
    deleteFile,
    elementRef,
    handleDrop,
    handleDragOver,
    handleDragStart,
  } = useDirectoryManage({ currentDirectory, setCurrentDirectory, searchQuery });

  const handleViewToggle = () => (listView === 'list' ? sort() : null);
  const handleSortIcon = () => (isSortAsc ? <IconUpArrow /> : <IconDownArrow />);
  
  return (
    <div>
      <div className="p-2 w-full inline-flex items-center justify-end">
        <div className="inline-flex items-center gap-4">
          <div className="mr-2 h-8 w-8" onClick={handleGridView}>
            <IconGrid />
          </div>
          <div className="mr-2 h-8 w-8" onClick={handleListView}>
            <IconList />
          </div>
          {listView === 'list' && (
            <div className="mr-2 h-8 w-8" onClick={handleViewToggle}>
              {handleSortIcon()}
            </div>
          )}
          <div className="mr-2 h-8 w-8" onClick={addFolder}>
            <IconAddFolder />
          </div>
          <div className="mr-2 h-8 w-8" onClick={addFile}>
            <IconAddFile />
          </div>
          {selected && (
            <>
              <div className="mr-2 h-8 w-8" onClick={deleteFile}>
                <IconDelete />
              </div>
              <div className="mr-2 h-8 w-8" onClick={editDirName}>
                <IconEdit />
              </div>
            </>
          )}
        </div>
      </div>
      <main className="p-4">
        <div
          onChange={updateDirName}
          onClick={handleDirectoryClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragStart={handleDragStart} 
          className={listView === 'list' ? 'flex flex-col' : 'grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3'}
        >
          {dirItems?.map((dir) => (
            <DirCard
              elementRef={elementRef}
              key={dir.id}
              directory={dir}
              selected={selected?.id === dir.id}
              editable={editDir?.id === dir.id}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default React.memo(CurrentDirectoryManager);
