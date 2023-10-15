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

export type UpdateOnePageRequest = {
  parentId?: string;
  name: string;
  iconName: string;
  isSoftDeleted: boolean;
  content?: string;
}

export type UpdateManyPageRequest = {
  pageId: string;
  parentId?: string;
  name: string;
  iconName: string;
  isSoftDeleted: boolean;
  content?: string;
}