import { Panel } from "rsuite";
import { useUser } from "../../../context/user/user.context";
const UserData = () => {
  const { userBankAccount } = useUser();
  return (
    <Panel className="h-40 bg-white shadow-md">
      <div className="flex justify-between text-2xl ">
        <span>Nombre:</span>
        <div className="font-bold">{userBankAccount?.user.name}</div>
      </div>
      <div className="flex justify-between text-2xl">
        <span>Email:</span>
        <span className="font-bold">{userBankAccount?.user.email}</span>
      </div>
    </Panel>
  );
};

export default UserData;
