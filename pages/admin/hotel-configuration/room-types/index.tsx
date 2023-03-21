import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import Seo from '../../../../components/Seo';
import Header from '../../../../components/Admin/Table/Header';
import AddButton from '../../../../components/Admin/Table/AddButton';
import Entries from '../../../../components/Admin/Table/Entries';
import EditButton from '../../../../components/Admin/Table/EditButton';
import DeleteButton from '../../../../components/Admin/Table/DeleteButton';
import Error from '../../../../components/Error';
import { getRoomTypes } from '../../../../lib/api/roomTypes';
import {
  useDeleteRoomType,
  useGetRoomTypes,
} from '../../../../lib/operations/roomTypes';
import ErrorMessage from '../../../../components/ErrorMessage';
import Pagination from '../../../../components/Admin/Table/Pagination';

const headers: string[] = ['ID', 'Name', 'Occupancy', 'Price', 'Action'];

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  const page = context.query.page || 1;
  const limit = context.query.limit || 10;

  await queryClient.prefetchQuery(['roomTypes'], () =>
    getRoomTypes(Number(page), Number(limit))
  );

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const RoomTypes = () => {
  const router = useRouter();

  const page = router.query.page || 1;
  const limit = router.query.limit || 10;

  const {
    data: roomTypesData,
    isError: isRoomTypesError,
    error: roomTypesError,
  } = useGetRoomTypes(Number(page), Number(limit));

  const roomTypes = roomTypesData?.roomTypes;
  const pageCount = roomTypesData?.pageCount;

  const {
    mutate,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteRoomType();

  const deleteRoomTypeHandler = async (id: number) => {
    await mutate(id);
  };

  if (isRoomTypesError) return <Error message={roomTypesError.message} />;

  return (
    <div>
      <Seo title="Room Types" />
      <div className="flex justify-between">
        <Header title="Room types" />
        <AddButton name="room type" />
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
              {roomTypes?.map(({ id, name, occupancy, price }) => (
                <tr key={id} className="border-b">
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{occupancy}</td>
                  <td>{Number(price) / 100}$</td>
                  <td className="w-40 py-3">
                    <div>
                      <EditButton id={id!} />
                      <DeleteButton
                        deleteHandler={() => deleteRoomTypeHandler(id!)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {roomTypes?.length === 0 && (
            <p className="text-center mt-5">No data available in table</p>
          )}
        </div>
        <Pagination page={Number(page)} pageCount={pageCount!} />
      </div>
    </div>
  );
};

export default RoomTypes;
