"use client";
"use client";
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { GetVerifyEmail } from "../../../actions/verifyEmail";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { sentOtp } from "../../../actions/sentOtp";
import { ServerForgotPassword } from "../../../actions/forgotPassword";

interface FormValues {
  password: string;
  confirmpassword: string;
}

const ConfirmPassword = ({ email }: { email: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues: {
      password: "",
      confirmpassword: "",
    },
  });

  const handleChangePassword = async (data: any) => {
    try {
      // console.log(data);
      if (data.password !== data.confirmpassword) {
        toast({
          title: "Mismatch Password",
        });
        return;
      }
      data.email = email;
      setIsLoading(true);
      const res = await ServerForgotPassword(data);
      if (!res.status) {
        throw new Error(res.message);
      }

      toast({
        title: res.message,
        description: "Password Changed Successfully, Please Login now!",
      });

      if(res.status){
        router.push('/login');
      }
    } catch (error: any) {
      toast({
        title: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center bg-gray-900">
        <div className="block absolute top-0 left-0 h-full w-full">
          <Image
            src="/images/jobBG2.jpeg"
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        </div>
        <div className="relative z-10 w-full max-w-md mx-auto opacity-90 bg-gray-800 p-6 rounded-lg shadow-5xl">
          <Card className="w-full bg-gray-800 border-gray-600">
            <CardHeader>
              <CardTitle className="text-gray-200 font-semibold flex justify-center">
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleChangePassword)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200">
                          New Password
                        </FormLabel>
                        <FormControl>
                          <Input
                           type={hidePassword ? "password" : "text"}
                           className="outline-none"
                            placeholder="Enter your new Password.."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmpassword"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-end justify-between">
                          <FormLabel className="text-gray-200">
                            Confirm Password
                          </FormLabel>
                          <div className="inline-flex items-center justify-center gap-x-2 hover:cursor-pointer" onClick={()=>setHidePassword(!hidePassword)}>
                            {
                                hidePassword ? (<FaEye className="text-white"/>) : (<FaEyeSlash className="text-white"/>)
                            }
                            <FormLabel className="text-gray-200 hover:cursor-pointer">{
                            hidePassword ? ("See") : ("Hide")}</FormLabel>
                          </div>
                        </div>
                        <FormControl>
                          <Input type={hidePassword ? "password" : "text"} className="outline-none" placeholder="Confirm Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full hover:bg-black">
                    {isLoading ? (
                      <span className="flex gap-x-2 items-center">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Please Wait
                      </span>
                    ) : (
                      <span>Change Password</span>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col gap-y-3"></CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ConfirmPassword;
