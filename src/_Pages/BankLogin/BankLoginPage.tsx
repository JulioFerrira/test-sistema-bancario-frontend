import { gqlAuth } from "@/gql";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, Panel } from "rsuite";
import { ILoginInput, ILoginResponse } from "../../gql/Auth/mutations";
const BankLoginPage = () => {
  const { control, handleSubmit } = useForm<ILoginInput>();

  const [login, { data: loginData }] = useMutation<
    { login: ILoginResponse },
    { loginInput: ILoginInput }
  >(gqlAuth.mutations.LOGIN, {
    variables: {
      loginInput: {
        email: "jose@gmail.com",
        password: "12345678",
      },
    },
  });

  const onLogin = async (input: ILoginInput) => {
    await login({
      variables: {
        loginInput: {
          email: input.email,
          password: input.password,
        },
      },
    });
  };

  useEffect(() => {
    if (loginData?.login) {
      console.log(loginData?.login);
    }
  }, [loginData]);

  return (
    <form
      className="flex items-center justify-center w-screen h-screen bg-blue-200"
      onSubmit={handleSubmit(onLogin)}
    >
      <Panel
        header={<h1 className="font-sans text-2xl">Login Sistema Bancario</h1>}
        shaded
        className="bg-white py-14 px-11"
        bodyFill
      >
        <div className="flex flex-col space-y-7">
          <div className="">
            <label className="text-md">Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Email" className="p-3 " />
              )}
            />
          </div>
          <div className="">
            <label className="text-md">Password</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Password"
                  type="password"
                  className="p-3 "
                />
              )}
            />
          </div>
          <Button
            type="submit"
            className="py-3 text-white bg-blue-700 rounded-md hover:bg-blue-500 hover:text-white"
          >
            Login
          </Button>
        </div>
      </Panel>
    </form>
  );
};

export default BankLoginPage;
