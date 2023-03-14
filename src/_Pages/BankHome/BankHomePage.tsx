import { useState } from "react";
import NavBar from "../../_Components/NavBar/index";
import BankAccountData from "./components/BankAccountData";
import ContactsTable from "./components/ContactsTable";
import Deposit from "./components/Forms/Deposit";
import Transference from "./components/Forms/Transference";
import UserData from "./components/UserData";

const BankHomePage = () => {
  const [activeKey, setActiveKey] = useState("");

  return (
    <div className="bg-blue-100">
      <NavBar
        activeKey={activeKey}
        onSelect={setActiveKey}
        appearance={"inverse"}
        drawerTransfer={(setDrawer, drawer) => (
          <Transference drawer={drawer} setDrawer={setDrawer} />
        )}
        drawerDeposit={(setDrawer, drawer) => (
          <Deposit drawer={drawer} setDrawer={setDrawer} />
        )}
      />
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
    </div>
  );
};

export default BankHomePage;
