import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import Seo from '../../../../components/Seo';
import Header from '../../../../components/Admin/Table/Header';
import AddButton from '../../../../components/Admin/Table/AddButton';
import EditButton from '../../../../components/Admin/Table/EditButton';
import Error from '../../../../components/Error';
import { Entries } from '../../../../components/Admin';
import DeleteButton from '../../../../components/Admin/Table/DeleteButton';
import { useDeleteRoom, useGetRooms } from '../../../../lib/operations/rooms';
import { getRooms } from '../../../../lib/api/rooms';
import { roomStatuses } from '../../../../constants/constants';
import ErrorMessage from '../../../../components/ErrorMessage';
import Pagination from '../../../../components/Admin/Table/Pagination';

const headers: string[] = [
  'Id',
  'Room type',
  'Room number',
  'Floor number',
  'Reservation Status',
  'Action',
];

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  const page = context.query.page || 1;
  const limit = context.query.limit || 10;

  await queryClient.prefetchQuery(['rooms'], () =>
    getRooms(Number(page), Number(limit))
  );

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const Rooms = () => {
  const router = useRouter();

  const page = router.query.page || 1;
  const limit = router.query.limit || 10;

  const {
    data: roomsData,
    isError: isRoomsError,
    error: roomsError,
  } = useGetRooms(Number(page), Number(limit));

  const rooms = roomsData?.rooms;
  const pageCount = roomsData?.pageCount;

  const {
    mutate,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteRoom();

  const deleteRoom = async (id: number) => {
    await mutate(id);
  };

  if (isRoomsError) return <Error message={roomsError.message} />;

  return (
    <div>
      <Seo title="Rooms" />
      <div className="flex justify-between">
        <Header title="Rooms" />
        <AddButton name="room" />
      </div>
      {isDeleteError && <ErrorMessage errorMessage={deleteError.message} />}
      <div className="bg-white px-5 py-7 mt-8 rounded-lg">
        <div className="flex justify-between flex-wrap gap-5">
          <Entries />
          <div className="flex items-center gap-3">
            <p>Search</p>
            <input className="border rounded py-1" />
          </div>
        </div>
        <div className="overflow-auto">
          <table className="table-auto min-w-[500px] w-full mt-8">
            <thead className="text-left">
              <tr className="border-b">
                {headers.map((header) => (
                  <th key={header} className="pb-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rooms?.map(
                ({ id, roomType, roomNumber, floorNumber, roomStatus }) => (
                  <tr key={id} className="border-b">
                    <td>{id}</td>
                    <td>{roomType.name}</td>
                    <td>{roomNumber}</td>
                    <td>{floorNumber}</td>
                    <td>{roomStatuses[roomStatus]}</td>
                    <td className="w-40 py-3">
                      <div>
                        <EditButton id={id} />
                        <DeleteButton deleteHandler={() => deleteRoom(id)} />
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          {rooms?.length === 0 && (
            <p className="text-center mt-5">No data available in table</p>
          )}
        </div>
        <Pagination page={Number(page)} pageCount={pageCount!} />
      </div>
    </div>
  );
};

export default Rooms;
