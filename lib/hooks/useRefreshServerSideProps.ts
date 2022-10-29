import { useRouter } from 'next/router';

const useRefreshServerSideProps = () => {
  const router = useRouter();

  return {
    refresh: () => router.replace(router.asPath),
  };
};

export default useRefreshServerSideProps;
