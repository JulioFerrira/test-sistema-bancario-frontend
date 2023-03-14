import { Panel } from "rsuite";
import { useUser } from "../../../context/user/user.context";
import { moneyMask } from "../../../utils/moneyMask";
const BankAccountData = () => {
  const { userBankAccount } = useUser();
  return (
    <Panel className="h-40 bg-white shadow-md">
      <div className="flex justify-between text-2xl ">
        <span>Banco:</span>
        <div className="font-semibold">
          {userBankAccount?.bankAccount?.bankName}
        </div>
      </div>
      <div className="flex justify-between text-2xl">
        <span>Monto:</span>
        <span className="font-semibold">
          {moneyMask(userBankAccount?.bankAccount?.balance || 0)}
        </span>
      </div>
      <div className="flex justify-between mb-2 text-2xl">
        <p>Numero de cuenta:</p>
        <p className="font-semibold">
          {userBankAccount?.bankAccount.accountNumber}
        </p>
      </div>
    </Panel>
  );
};

export default BankAccountData;
