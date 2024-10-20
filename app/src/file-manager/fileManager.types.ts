export interface DirectoryState {
    id: string;
    name: string;
    parentId: string;
    type: "directory" | "file"
    createdAt?: string;
    updatedAt?: string;
}


export interface CurrentDirectoryManagerProps {
    directory: DirectoryState;
    selected: boolean;
    editable: boolean;
    elementRef: React.RefObject<HTMLButtonElement | HTMLInputElement>;
}

export interface DirResponse extends DirectoryState {
    list: DirectoryState[]
}