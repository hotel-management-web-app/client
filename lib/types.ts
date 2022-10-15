export interface RoomType {
  id: number;
  name: string;
  description: string;
  occupancy: number;
  price: string;
  amenities: {
    id: number;
    name: string;
  }[];
  details: {
    id: number;
    name: string;
  }[];
}

export interface Room {
  id: number;
  roomType: string;
  roomNumber: number;
  floorNumber: number;
  roomStatus: string;
}

export interface SelectOption {
  label: string;
  value: string;
}
