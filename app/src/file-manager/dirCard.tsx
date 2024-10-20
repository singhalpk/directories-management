import React, { memo, useMemo } from 'react';
import { Button } from '../components/button';
import { IconChevronRight, IconFile, IconFolder } from '../components/icons';
import { Input } from '../components/input';
import { CurrentDirectoryManagerProps, DirectoryState } from './fileManager.types';


const DirCard = ({
  directory,
  selected,
  elementRef,
  editable,
}: CurrentDirectoryManagerProps) => {
  
  const isFile = directory.type === 'file';
  const isDirectory = directory.type === 'directory';

  const icon = useMemo(() => {
    return isFile ? <IconFile /> : <IconFolder />;
  }, [isFile]);

  const inputOrText = useMemo(() => {
    return editable ? (
      <Input ref={elementRef as React.RefObject<HTMLInputElement>} id={directory.id} type="text" defaultValue={directory.name} />
    ) : (
      <span>{directory.name}</span>
    );
  }, [editable, directory.name, directory.id, elementRef]);

  const buttonClass = `h-20 !justify-start ${selected ? 'border-4 border-indigo-500' : ''}`;

  return (
    <Button
      draggable
      ref={elementRef as React.RefObject<HTMLButtonElement>}
      id={directory.id}
      variant={isFile ? 'link' : 'outline'}
      className={buttonClass}
    >
      <div className="mr-2 h-8 w-8">
        {icon}
      </div>
      <div className="flex flex-col items-start">
        {inputOrText}
      </div>
      {isDirectory && (
        <div className="ml-auto h-4 w-4">
          <IconChevronRight />
        </div>
      )}
    </Button>
  );
};

export default memo(DirCard);
