import { useSession } from "next-auth/react";
import UseAxiosNormal from "../(axoisSecureNormal)/axiosNormal";
import { useQuery } from "@tanstack/react-query";

const UseUser = () => {
  const { data: session, status } = useSession();
  const axiosInstanceNormal = UseAxiosNormal();

  const { data: userInfo, isLoading: userInfoLoading } = useQuery({
    queryKey: ["user", session?.user?.email],
    queryFn: async () => {
      const res = await axiosInstanceNormal.get(
        `/signin/${session?.user?.email}`
      );
      return res.data.userInfo;
    },
  });

  return { userInfo, userInfoLoading };
};

export default UseUser;
