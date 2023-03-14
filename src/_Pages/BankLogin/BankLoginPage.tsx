import { gqlAuth } from "@/gql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, Input, Panel } from "rsuite";
import { USER_TOKEN_PERSIST } from "../../config/constants";
import { ILoginInput, ILoginResponse } from "../../gql/Auth/mutations";

const BankLoginPage = () => {
  const { control, handleSubmit } = useForm<ILoginInput>();
  const router = useRouter();
  const [login, { data: loginData }] = useMutation<
    { login: ILoginResponse },
    { loginInput: ILoginInput }
  >(gqlAuth.mutations.LOGIN);

  const onLogin = async (input: ILoginInput) => {
    try {
      await login({
        variables: {
          loginInput: {
            email: input.email,
            password: input.password,
          },
        },
      });
      toast("Login realizado con exit!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.replace("/app/home");
    } catch (error: any) {
      console.log(error);
      toast("Error al iniciar sesion!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    if (loginData?.login) {
      localStorage.setItem(USER_TOKEN_PERSIST, loginData?.login?.token || "");
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
              rules={{ required: true }}
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
              rules={{ required: true }}
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
