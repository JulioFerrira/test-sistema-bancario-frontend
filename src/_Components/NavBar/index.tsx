import { Nav, Navbar, NavbarProps } from "rsuite";

interface Props extends NavbarProps {
  onSelect: (eventKey: any) => void;
  activeKey: string;
}

const NavBar = ({ onSelect, activeKey, ...props }: Props) => {
  return (
    <Navbar {...props}>
      <Navbar.Brand href="#">StmaBnk</Navbar.Brand>
      <Nav onSelect={onSelect} activeKey={activeKey}>
        <Nav.Item eventKey="1">Contactos</Nav.Item>
        <Nav.Item eventKey="2">Depositar</Nav.Item>
        <Nav.Item eventKey="3">Retirar</Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
