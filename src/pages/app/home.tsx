import BankHomePage from "@/_Pages/BankHome/BankHomePage";
import { useState } from "react";
import withAuth from "../../utils/validateAuth";
import NavBar from "../../_Components/NavBar/index";

const BankHome = () => {
  const [activeKey, setActiveKey] = useState("");
  return (
    <div className="bg-blue-100">
      <NavBar
        activeKey={activeKey}
        onSelect={setActiveKey}
        appearance={"inverse"}
      />
      <BankHomePage />;
    </div>
  );
};
export default withAuth(BankHome);
