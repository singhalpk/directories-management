import React, { ChangeEvent, useEffect } from "react"
import { useState } from "react"
import { Button } from "../components/button"
import { Input } from "../components/input"
import { IconChevronLeft, IconFile, IconFolder, IconHome, IconSearch } from "../components/icons"
import { DirectoryState, DirResponse } from "./fileManager.types"
import CurrentDirectoryManager from "./currentDirManager"
import useFetch from "../hooks/useFetch"
import { BASE_URL } from "../constants"


const FileManager : React.FC = () => {
  const { data, loading, error, get } = useFetch<{data:DirResponse}>(BASE_URL);
  const { data:backParentData, get:getParent } = useFetch<{data:DirResponse}>(BASE_URL);
  const [currentDirectory, setCurrentDirectory] = useState<DirectoryState>();
  const [rootDirectory, setRootDirectory] = useState<DirectoryState[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");


  useEffect(() => {
    get('root');
  }, []);

  useEffect(() => {
    if(data?.data){
      const { list, ...rest} = data?.data;
      setCurrentDirectory(rest);
      if(rest.id==='root'){
        setRootDirectory(data?.data.list.filter(item => item.type==="directory"));
      }
    }
  },[data])

  useEffect(() => {
    if(backParentData?.data){
      const { list, ...rest} = backParentData?.data;
      setCurrentDirectory(rest);
    }
  },[backParentData])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchQuery(value);
  };



  const handleDirectoryClick = (dir: DirectoryState) => {
    setCurrentDirectory(dir)
  }

  const handleBackClick = (e:React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
    if(currentDirectory?.parentId){
      getParent(currentDirectory?.parentId);
    }
  }

  const renderDirectory = (dir: DirectoryState) => (
    <Button
      key={dir.id}
      variant="ghost"
      className="w-full justify-start"
      onClick={() => handleDirectoryClick(dir)}
    >
      <div className="mr-2 h-4 w-4"><IconFolder /></div>
      {dir.name}
    </Button>
  )

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 border-r">
        <div className="flex h-14 items-center border-b px-4">
          <Button variant="ghost" className="font-bold" onClick={() => setCurrentDirectory(rootDirectory[0])}>
          <div className="mr-2 h-4 w-4"><IconHome  /></div>
            File Manager
          </Button>
        </div>
        <div className="p-4">
          <h2 className="mb-2 text-lg font-semibold">Directories</h2>
          <div className="space-y-2">
            {(rootDirectory ?? []).filter(item => item.parentId==="root").map(renderDirectory)}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <header className="flex h-14 items-center justify-between border-b px-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={handleBackClick} disabled={currentDirectory?.id === "root"}>
              <div className="h-4 w-4">
                <IconChevronLeft />
              </div>
              Back
            </Button>
            <h1 className="text-lg font-semibold">{currentDirectory?.name}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <form>
              <div className="relative">
                <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" >
                  <IconSearch/>
                </div>
                <Input
                  type="search"
                  placeholder="Search files..."
                  className="w-[200px] pl-8 md:w-[300px]"
                  onChange={onChange}
                />
              </div>
            </form>
          </div>
        </header>
        {currentDirectory 
        && <CurrentDirectoryManager
          currentDirectory={currentDirectory}
          setCurrentDirectory={setCurrentDirectory}
          searchQuery={searchQuery}
        />}
      </div>
    </div>
  )
}


export default FileManager;