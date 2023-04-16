import { getServerSession } from "next-auth/next";
import UserInformation from "./user-information";

export default function AppDescription() {
  const session = async () => await getServerSession()();
  console.log(session);

  return (
    <div>
      <div>
        This is the application description component (server component).
      </div>
      <UserInformation data={session?.user} />
    </div>
  );
}
