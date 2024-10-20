import { ChangeEvent, useEffect } from 'react';
import { useState } from 'react';
import { debounce } from "../utils"
import useKeyPress from '../hooks/useKeyPress';
import { DirectoryState, DirResponse } from '../file-manager/fileManager.types';
import useOutsideClick from '../hooks/useOutsideClick';
import { BASE_URL } from '../constants';
import useFetch from './useFetch';

export interface CurrentDirectoryManagerProps {
	currentDirectory: DirectoryState;
	setCurrentDirectory: (dir: DirectoryState) => void;
	searchQuery:string;
}

export const useDirectoryManage =({
	currentDirectory,
	setCurrentDirectory,
	searchQuery,
}: CurrentDirectoryManagerProps) => {

	const [dirItems, setDirItems] = useState<DirectoryState[]>([]);
	const [listView, setListView] = useState<'grid' | 'list'>('grid');
	const [selected, setSelected] = useState<DirectoryState | null>(null);
	const [editDir, setEditDir] = useState<DirectoryState | null>(null);

	const [isSortAsc, setIsSortAsc] = useState<boolean>(true);

	const { data:fetchedData, get} = useFetch<{data:DirResponse}>(BASE_URL);
	const { data:searchData, get:searchQueryAPi} = useFetch<{data:DirectoryState[]}>(BASE_URL);
	const { data:createData, post:createDirAPi} = useFetch<{data:DirectoryState}>(BASE_URL);
	const { data:deleteData, del:deleteDirAPi} = useFetch<{data:DirectoryState}>(BASE_URL);
	const { patch:updateDirAPi} = useFetch<{data:DirectoryState}>(BASE_URL);

	const fetchData = (orderBy?:string) => {
		get(orderBy?`${currentDirectory.id}?orderBy=${orderBy}`:`${currentDirectory.id}`);
	};
  
	useEffect(() => {
	  fetchData();
	}, [currentDirectory.id]);
  
	useEffect(() => {
	  if(fetchedData?.data){
		const { list, ...rest} = fetchedData?.data;
		setCurrentDirectory(rest);
		setDirItems(fetchedData?.data.list);
	  }
	},[fetchedData])

	useEffect(() =>{
		if(createData?.data){
			setDirItems(prev => [...prev, {...createData?.data}]);
		}
	},[createData]);

	useEffect(() => {
		if(deleteData?.data){
			setDirItems(prev => prev.filter(item => item.id !== deleteData?.data.id));
			setSelected(null)
		}
	},[deleteData])

	useEffect(() => {
		if(searchData?.data){
			setDirItems(searchData?.data)
		}
	},[searchData])



	const handleEnterPress =(event: KeyboardEvent)=>{
		if(!['Enter','Backspace'].includes(event.key)){
			return;
		}
		if(event.key === 'Enter' && selected?.id){
			setSelected(null);
			if(!editDir){
				setCurrentDirectory(selected);
			}
			else{
				const editData  =dirItems.find(item => item.id===editDir.id);
				if(editData?.name){
					updateDirAPi(`/${editDir.id}`,{name:editData.name})
				}
			}
		}
		if(event.key === 'Backspace' && selected){
            if(editDir){
                return;
            }
			deleteDirAPi(`/${selected?.id}`);
		}
		setEditDir(null);
	}

	useKeyPress(handleEnterPress);


	const handleInputChange = debounce((value: string) => {
		if(!value){
			fetchData();
		} else{
			searchQueryAPi(`search?searchQuery=${value}`);
		}
	  }, 500); 
	
	useEffect(() => {
		handleInputChange(searchQuery);
	}, [searchQuery]);


	const addFile = () => {
		createDirAPi('',{
			name: "File",
			parentId: currentDirectory.id,
			type: 'file'
		  });
	}

	const deleteFile = () => {
		if(selected?.id){
			deleteDirAPi(`/${selected?.id}`);
		}
	}

	const addFolder = () => {
		createDirAPi('',{
			name: "New Folder",
			parentId: currentDirectory.id,
			type: "directory"
		  });
	}

	const sort = () => {
		setIsSortAsc(!isSortAsc);
		if (isSortAsc) {
		  fetchData('ASC');
		} else {
		  fetchData('DESC');
		}
	}

	const handleListView = () => {
		setListView('list');
	}

	const handleGridView = () => {
		setListView('grid');
	}

	const handleOutsideClick = (event:MouseEvent) => {
		const clickedDirId = (event.target as HTMLElement).id;
		if(clickedDirId!==editDir?.id){
			if(editDir?.id){
				const editData  =dirItems.find(item => item.id===editDir?.id);
				if(editData?.name){
					updateDirAPi(`/${editDir.id}`,{name:editData.name})
				}
			}
			setSelected(null)
			setEditDir(null)
		}
	}

    const elementRef = useOutsideClick(handleOutsideClick);


	const handleDirectoryClick = (e:React.MouseEvent<HTMLElement>) => {
		if(editDir){
			return;
		}
		const clickedDirId = (e.target as HTMLElement).id;
		const clickedDir = dirItems.find(item => item.id === clickedDirId);
		if(!clickedDir){
			return;
		}
		if(selected?.id===clickedDirId && clickedDir.type === "directory"){
			setSelected(null);
			setCurrentDirectory(clickedDir)
		} else {
			setSelected(clickedDir)
		}
	};

	const editDirName = () => {
		setEditDir(selected);
	}

	const updateDirName = (e:ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDirItems(prev => {
			const index = prev.findIndex(item => item.id === selected?.id);
			if (index !== -1) {
				// Create a new array and update the item at the found index
				return [
					...prev.slice(0, index), // Items before the index
					{ ...prev[index], name: e.target.value }, // Updated item
					...prev.slice(index + 1), // Items after the index
				];
			}
			return prev; // Return previous state if index is -1
		});		
	}


	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault(); 
		const draggedItemId = e.dataTransfer.getData('text'); 
		const dropItem  =dirItems.find(item => item.id===draggedItemId);
		if(dropItem?.id){
			updateDirAPi(`/${dropItem.id}`,{parentId:(e.target as HTMLDivElement).id})
			fetchData();
		}
	};
  
	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault(); 
	};
  
	const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
		e.dataTransfer.setData('text/plain',  (e.target as HTMLDivElement).id); 
	};

    return {
        listView,
        handleListView,
        handleGridView,
        handleOutsideClick,
        handleDirectoryClick,
        editDirName,
        updateDirName,
        selected,
        editDir,
        dirItems,
        setCurrentDirectory,
        setEditDir,
        setDirItems,
        setSelected,
        addFile,
        addFolder,
        sort,
        deleteFile,
        isSortAsc,
		elementRef,
		handleDrop,
		handleDragOver,
		handleDragStart,
    }
}