"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import loginHandler from "../../../actions/MyLogin";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { loginResolver, loginSchema } from "@/types/SchemaLogin";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { LoginUser } from "../../../actions/login";
import { useRouter } from "next/navigation";
// import { auth, signIn } from "@/auth";
import { sentOtp } from "../../../actions/sentOtp";
import AtLoginTimeVerify from "@/components/pages/AtLoginTimeVerify";
  // import { AccountWithGoogle } from "../../../actions/AccountWithGoogle";

const Login = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [verifyEmail, setIsVerifyEmail] = useState(false);
  const [haveUserDetails, setHaveUserDetails] = useState<any>();
  
  const form = useForm<loginSchema>({
    resolver: loginResolver,
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const handleLogin = async (data: loginSchema) => {
    try {
      setIsLoading(true);
      const res = await LoginUser(data);
      if (!res?.status) {
        throw new Error(res?.message);
      }

      if (res.status) {
        router.push("/");
      }
      // console.log(res);
    } catch (error: any) {
      // console.log(error);
      if (error.message == "Only Verified Users can login") {
        toast({
          title: error.message,
          description: "Please Verify your email address",
        });
      }
      toast({
        title: error.message,
        description: "Something went wrong!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // const handleGoogleLogin = async () => {
  //   await AccountWithGoogle();
  // }
  return (
    <>
      {!verifyEmail ? (
        <div className="h-screen w-screen flex justify-center items-center bg-cover bg-center bg-gray-900" style={{ backgroundImage: "url('/images/jobBG2.jpeg')" }}>
          <div className="relative z-10 w-full max-w-md mx-auto opacity-90 bg-gray-800 ml-2 mr-2 md:ml-0 md:mr-0 p-6 rounded-lg shadow-5xl">
            <Card className="w-full bg-gray-800 border-gray-600">
              <CardHeader>
                <CardTitle className="text-gray-200 font-semibold flex justify-center">
                  Welcome back, Login Now!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleLogin)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your Email.."
                              {...field}
                            />
                          </FormControl>
                          <p
                            className="text-blue-400 hover:text-blue-600 duration-300 ease-in-out font-medium hover:cursor-pointer"
                            onClick={() => setIsVerifyEmail(true)}
                          >
                            Verify Email
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200">
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your Password.."
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <Link href="/forgot-Password">
                            <p className="text-blue-400 mt-2 hover:text-blue-600 duration-300 ease-in-out font-medium hover:cursor-pointer">
                              Forgot Password?
                            </p>
                          </Link>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full ${isLoading} ?  bg-gray-800: `}
                    >
                      {isLoading ? (
                        <span className="flex gap-x-2 items-center">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Please Wait
                        </span>
                      ) : (
                        <span>Login Now</span>
                      )}
                    </Button>
                  </form>
                </Form>

                {/* <form action={loginHandler}>
                <Input name="email" type="email" placeholder="Email"/>
                <Input name="password" type="password" placeholder="Password"/>
                <button type="submit">Submit</button>
              </form> */}
              </CardContent>
              <CardFooter className="flex flex-col gap-y-3">
                {/* <form
                  // action={handleGoogleLogin}
                  className="ease-in-out duration-300 w-full font-medium"
                >
                  <Button
                    variant="outline"
                    className="w-full gap-x-2 hover:bg-gray-300"
                  >
                    <FcGoogle className="text-xl" />
                    Login with Google
                  </Button>
                </form> */}
                <Link href="/signup" className="text-blue-600">
                  Dont have an account?
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <AtLoginTimeVerify />
      )}
    </>
  );
};

export default Login;
