import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import moment from 'moment';
import { getUsers } from '../../../lib/api/user';
import { useDeleteUser, useGetUsers } from '../../../lib/operations/user';
import { Entries } from '../../../components/Admin';
import AddButton from '../../../components/Admin/Table/AddButton';
import DeleteButton from '../../../components/Admin/Table/DeleteButton';
import EditButton from '../../../components/Admin/Table/EditButton';
import Header from '../../../components/Admin/Table/Header';
import Seo from '../../../components/Seo';
import Error from '../../../components/Error';
import ErrorMessage from '../../../components/ErrorMessage';
import Pagination from '../../../components/Admin/Table/Pagination';
import Search from '../../../components/Admin/Table/Search';

const headers: string[] = [
  'Id',
  'Name',
  'Email',
  'Last login',
  'Phone Number',
  'Role',
  'Action',
];

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  const page = context.query.page || 1;
  const limit = context.query.limit || 10;

  await queryClient.prefetchQuery(['users'], () =>
    getUsers(Number(page), Number(limit))
  );

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const Users = () => {
  const router = useRouter();

  const { search } = router.query;
  const page = router.query.page || 1;
  const limit = router.query.limit || 10;

  const {
    data: usersData,
    isError: isUsersError,
    error: usersError,
    refetch,
  } = useGetUsers(Number(page), Number(limit), search as string);

  const userId = usersData?.userId;
  const users = usersData?.users;
  const pageCount = usersData?.pageCount;

  useEffect(() => {
    refetch();
  }, [page, limit, search]);

  const {
    mutate,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteUser();

  const deleteUser = async (id: number) => {
    if (
      // eslint-disable-next-line no-alert
      window.confirm(
        'Are you sure you want to delete this user? This action will be irreversible'
      )
    ) {
      await mutate(id);
    }
  };

  if (isUsersError) return <Error message={usersError.message} />;

  return (
    <div>
      <Seo title="Users" />
      <div className="flex justify-between">
        <Header title="Users" />
        <AddButton name="user" />
      </div>
      {isDeleteError && <ErrorMessage errorMessage={deleteError.message} />}
      <div className="bg-white px-5 py-7 mt-8 rounded-lg">
        <div className="flex justify-between flex-wrap gap-5">
          <Entries />
          <div className="flex items-center gap-3">
            <Search />
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
              {users?.map(
                ({ id, name, email, phoneNumber, lastLogin, role }) => (
                  <tr key={id} className="border-b">
                    <td className="py-3">{id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{moment(lastLogin).format('DD-MM-YYYY')}</td>
                    <td>{phoneNumber}</td>
                    <td>{role}</td>
                    {id !== userId && (
                      <td className="w-40 py-3">
                        <div>
                          <EditButton id={id!} />
                          <DeleteButton deleteHandler={() => deleteUser(id!)} />
                        </div>
                      </td>
                    )}
                  </tr>
                )
              )}
            </tbody>
          </table>
          {users?.length === 0 && (
            <p className="text-center mt-5">No data available in table</p>
          )}
        </div>
        <Pagination page={Number(page)} pageCount={pageCount!} />
      </div>
    </div>
  );
};

export default Users;
