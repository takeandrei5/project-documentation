export type CreatePageRequest = {
  parentId?: string;
  name: string;
  iconName: string;
}

export type PageDto = {
  id: string;
  name: string;
  iconName: string;
  parentId?: string;
  content?: string;
  isSoftDeleted: boolean;
}

export type UpdatePageRequest = {
  parentId?: string;
  name: string;
  iconName: string;
  isSoftDeleted: boolean;
  content?: string;
}