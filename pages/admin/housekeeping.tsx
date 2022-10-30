import React from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { nanoid } from 'nanoid';
import Header from '../../components/Admin/Header';
import HousekeepingComments from '../../components/Admin/HousekeepingComments';
import HousekeepingStatus from '../../components/Admin/HousekeepingStatus';
import PriorityStatus from '../../components/Admin/PriorityStatus';
import Seo from '../../components/Seo';
import { getRooms } from '../../lib/api/housekeeping';
import { useGetRooms } from '../../lib/operations/housekeeping';

const headers = [
  'Room',
  'Room Type',
  'Housekeeping Status',
  'Priority',
  'Floor',
  'Reservation Status',
  'Comments and notes',
];

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['housekeeping'], getRooms);

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const HousekeepingPage = () => {
  const { data } = useGetRooms();
  return (
    <div>
      <Seo title="Housekeeping" />
      <Header title="Housekeeping" />
      <div className="overflow-auto px-5 py-7 mt-8 bg-white rounded-lg">
        <table className="table-auto min-w-[1200px] w-full">
          <thead className="text-left">
            <tr className="border-b">
              {headers.map((header) => (
                <th key={nanoid()} className="pb-2">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((room) => (
              <tr key={room.id} className="border-b">
                <td className="py-3">{room.roomNumber}</td>
                <td className="py-3">{room.roomType}</td>
                <td className="py-3 w-60">
                  <HousekeepingStatus
                    id={room.id}
                    status={room.housekeepingStatus}
                  />
                </td>
                <td className="py-3 w-60">
                  <PriorityStatus id={room.id} status={room.priority} />
                </td>
                <td className="py-3">{room.floor}</td>
                <td className="py-3">{room.reservationStatus}</td>
                <td className="py-3">
                  <HousekeepingComments id={room.id} value={room.comments} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data?.length === 0 && (
          <p className="text-center mt-5">No data available in table</p>
        )}
      </div>
    </div>
  );
};

export default HousekeepingPage;
