import BankAccountData from "./components/BankAccountData";
import ContactsTable from "./components/ContactsTable";
import UserData from "./components/UserData";

const BankHomePage = () => {
  return (
    <div className="w-screen h-screen p-20">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col mb-10 space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6">
          <div className="flex-1">
            <BankAccountData />
          </div>
          <div className="flex-1">
            <UserData />
          </div>
        </div>
        <div className="flex flex-col">
          <ContactsTable />
        </div>
      </div>
    </div>
  );
};

export default BankHomePage;
