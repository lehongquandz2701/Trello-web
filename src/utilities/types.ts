export type TSelectOption = {
  value: string | number;
  title: string;
  icon: React.ReactNode;
};

export type TBoard = {
  _id: string;
  title: string;
  description: string;
  type: string; // 'private' or 'public'
  ownerIds: string[]; // Những users là Admin của board
  memberIds: string[]; // Những users là member bình thường của board
  columnOrderIds: string[]; // Thứ tự sắp xếp / vị trí của các Columns trong 1 boards
  columns: TColumns[];
};

export type TColumns = {
  _id: string;
  boardId: string;
  title: string;
  cardOrderIds: string[];
  cards: TCards[];
};

export type TCards = {
  _id: string;
  boardId: string;
  columnId: string;
  title?: string;
  description?: string | null;
  cover?: string | null;
  memberIds?: string[]; // This should be an array, not a string
  comments?: string[]; // This should be an array, not a string
  attachments?: string[];
  FE_PlaceholderCard?: boolean;
};

export type TUser = {
  _id: string;
  email: string;
  fullname: string;
  isAdmin: boolean;
  createdAt: number;
};
