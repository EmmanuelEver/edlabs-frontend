import { FC, PropsWithChildren } from "react";
import { SWRConfig, SWRConfiguration } from "swr";


const options: SWRConfiguration = {
  refreshInterval: 650000,
  revalidateOnFocus: false,
  dedupingInterval: 30000,
  //   use: [renewToken],
};

const SwrProvider:FC<PropsWithChildren> = ({ children }) => {
  return <SWRConfig value={options}>{children}</SWRConfig>;
};

export default SwrProvider;
