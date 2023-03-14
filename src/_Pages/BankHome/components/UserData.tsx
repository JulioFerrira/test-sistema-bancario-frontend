import { Panel } from "rsuite";
const UserData = () => {
  return (
    <Panel className="h-40 bg-white shadow-md">
      <div className="flex justify-between text-2xl ">
        <span>Nombre:</span>
        <div className="font-bold">Jose Morales</div>
      </div>
      <div className="flex justify-between text-2xl">
        <span>Email:</span>
        <span className="font-bold">jose@gmail.com</span>
      </div>
    </Panel>
  );
};

export default UserData;
