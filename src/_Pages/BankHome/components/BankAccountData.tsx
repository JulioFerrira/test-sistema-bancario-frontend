import { Button, Panel } from "rsuite";
const BankAccountData = () => {
  return (
    <Panel className="h-48 bg-white shadow-md">
      <div className="flex justify-between text-2xl ">
        <span>Banco:</span>
        <div className="font-bold">Banco de Chile</div>
      </div>
      <div className="flex justify-between text-2xl">
        <span>Monto</span>
        <span className="font-bold">1.200.000</span>
      </div>
      <div className="flex justify-between mb-2 text-2xl">
        <p>Numero de cuenta:</p>
        <p className="font-bold">123456789</p>
      </div>
      <div className="flex justify-between text-2xl">
        <Button className="p-4 text-white bg-blue-600">Guardar dinero</Button>
        <Button className="p-4 text-white bg-blue-600">Retirar dinero</Button>
      </div>
    </Panel>
  );
};

export default BankAccountData;
