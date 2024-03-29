import React from 'react';
import { dehydrate, QueryClient } from 'react-query';
import Header from '../../components/Admin/Table/Header';
import HousekeepingComments from '../../components/Admin/Housekeeping/HousekeepingComments';
import HousekeepingStatus from '../../components/Admin/Housekeeping/HousekeepingStatus';
import PriorityStatus from '../../components/Admin/Housekeeping/PriorityStatus';
import Seo from '../../components/Seo';
import Error from '../../components/Error';
import { getRooms } from '../../lib/api/rooms';
import { useGetRooms } from '../../lib/operations/rooms';
import {
  housekeepingStatuses,
  priorityStatuses,
  roomStatuses,
} from '../../constants/constants';

const headers = [
  'Room',
  'Room Type',
  'Housekeeping Status',
  'Priority',
  'Room',
  'Floor',
  'Reservation Status',
  'Comments and notes',
];

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['rooms'], () => getRooms());

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const HousekeepingPage = () => {
  const { data: roomsData, isError, error } = useGetRooms();

  const rooms = roomsData?.rooms;

  if (isError) return <Error message={error.message} />;

  return (
    <div>
      <Seo title="Housekeeping" />
      <Header title="Housekeeping" />
      <div className="overflow-auto px-5 py-7 mt-8 bg-white rounded-lg">
        <table className="table-auto min-w-[1200px] w-full">
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
              ({
                id,
                roomNumber,
                roomType,
                housekeepingStatus,
                priority,
                floorNumber,
                roomStatus,
                comments,
              }) => (
                <tr key={id} className="border-b">
                  <td className="py-3">{roomNumber}</td>
                  <td className="py-3">{roomType.name}</td>
                  <td className="py-3 w-60">
                    <HousekeepingStatus
                      id={id}
                      status={housekeepingStatuses[housekeepingStatus]}
                    />
                  </td>
                  <td className="py-3 w-60">
                    <PriorityStatus
                      id={id}
                      status={priorityStatuses[priority]}
                    />
                  </td>
                  <td className="py-3">{roomNumber}</td>
                  <td className="py-3">{floorNumber}</td>
                  <td className="py-3">{roomStatuses[roomStatus]}</td>
                  <td className="py-3">
                    <HousekeepingComments id={id} value={comments} />
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
    </div>
  );
};

export default HousekeepingPage;
