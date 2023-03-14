import BankHomePage from "@/_Pages/BankHome/BankHomePage";
import withAuth from "../../utils/validateAuth";

const BankHome = () => {
  return <BankHomePage />;
};
export default withAuth(BankHome);
