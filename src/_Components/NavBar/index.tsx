import { useRouter } from "next/router";
import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { Nav, Navbar, NavbarProps } from "rsuite";

interface Props extends NavbarProps {
  onSelect: (eventKey: any) => void;
  activeKey: string;
  drawerTransfer?: (
    setDrawer: Dispatch<SetStateAction<boolean>>,
    drawer: boolean
  ) => ReactElement<any, any>;
  drawerDeposit?: (
    setDrawer: Dispatch<SetStateAction<boolean>>,
    drawer: boolean
  ) => ReactElement<any, any>;
  drawerAddContact?: (
    setDrawer: Dispatch<SetStateAction<boolean>>,
    drawer: boolean
  ) => ReactElement<any, any>;
}

const NavBar = ({
  onSelect,
  activeKey,
  drawerTransfer,
  drawerDeposit,
  drawerAddContact,
  ...props
}: Props) => {
  const [openDrawerTranfer, setDrawerTranfer] = useState(false);
  const [openDrawerDeposit, setDrawerDeposit] = useState(false);
  const [openDrawerAddContact, setDrawerAddContact] = useState(false);
  const router = useRouter();

  const onCloseSession = () => {
    localStorage.clear();
    router.replace("/");
  };

  const onOpenTransferDrawer = () => {
    setDrawerTranfer(true);
  };

  const onOpenDepositDrawer = () => {
    setDrawerDeposit(true);
  };

  const onOpenAddContactDrawer = () => {
    setDrawerAddContact(true);
  };

  return (
    <>
      <Navbar {...props}>
        <Navbar.Brand href="#">StmaBnk</Navbar.Brand>
        <Nav onSelect={onSelect} activeKey={activeKey}>
          <Nav.Item eventKey="1" onClick={() => onOpenAddContactDrawer()}>
            Agregar contacto
          </Nav.Item>
          <Nav.Item eventKey="2" onClick={() => onOpenDepositDrawer()}>
            Depositar
          </Nav.Item>
          <Nav.Item eventKey="3" onClick={() => onOpenTransferDrawer()}>
            Transferir
          </Nav.Item>
          <Nav.Item eventKey="4" onClick={() => onCloseSession()}>
            Cerrar session
          </Nav.Item>
        </Nav>
      </Navbar>
      {drawerTransfer && drawerTransfer(setDrawerTranfer, openDrawerTranfer)}
      {drawerDeposit && drawerDeposit(setDrawerDeposit, openDrawerDeposit)}
      {drawerAddContact &&
        drawerAddContact(setDrawerAddContact, openDrawerAddContact)}
    </>
  );
};

export default NavBar;
