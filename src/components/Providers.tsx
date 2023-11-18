import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  session: Session;
}
const Providers = (props: Props) => {
  return (
    <SessionProvider session={props.session}>{props.children}</SessionProvider>
  );
};

export default Providers;
