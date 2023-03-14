import { Panel } from "rsuite";
import { useUser } from "../../../context/user/user.context";
const BankAccountData = () => {
  const { userBankAccount } = useUser();
  return (
    <Panel className="h-40 bg-white shadow-md">
      <div className="flex justify-between text-2xl ">
        <span>Banco:</span>
        <div className="font-bold">
          {userBankAccount?.bankSetting?.bankName}
        </div>
      </div>
      <div className="flex justify-between text-2xl">
        <span>Monto</span>
        <span className="font-bold">
          {userBankAccount?.bankAccount?.balance}
        </span>
      </div>
      <div className="flex justify-between mb-2 text-2xl">
        <p>Numero de cuenta:</p>
        <p className="font-bold">
          {userBankAccount?.bankAccount.accountNumber}
        </p>
      </div>
    </Panel>
  );
};

export default BankAccountData;
