"use client";
import { Button } from "@/components/ui/button";
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
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { sentOtp } from "../../../actions/sentOtp";

interface FormValues {
  email: string;
  otp: string;
}

const AtLoginTimeVerify = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [myEmail, setmyEmail] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const handleSendOTP = async () => {
    if (myEmail == "") {
      toast({
        title: "Email Field is empty",
        description: "Try again",
        variant: "destructive",
      });
      return;
    }
    try {
      setIsLoading(true);
      // console.log(myEmail);
      const res = await sentOtp(myEmail);
      if (!res.status) {
        throw new Error(res!.message);
      }

      toast({
        title: res.message,
        description: "Now you can enter the OTP",
      });
    } catch (error: any) {
      toast({
        title: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = async (data: any) => {
    try {
      // console.log(data);
      setIsLoading(true);
      const res = await GetVerifyEmail(data);
      if (!res.status) {
        throw new Error(res.message);
      }

      toast({
        title: res.message,
        description: "Email Verified Successfully, Please Login now!",
      });

      if (res.status) {
        router.push("/signup");
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
    <div className="h-screen w-screen flex justify-center items-center bg-gray-900 bg-center bg-cover" style={{ backgroundImage: "url('/images/jobBG2.jpeg')" }}>
     
      <div className="relative z-10 w-full max-w-md mx-auto opacity-90 bg-gray-800 p-6 rounded-lg shadow-5xl">
        <Card className="w-full bg-gray-800 border-gray-600">
          <CardHeader>
            <CardTitle className="text-gray-200 font-semibold flex justify-center">
              Verify your email here
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleVerifyEmail)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">
                        Enter your Email..
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your Email"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setmyEmail(e.target.value);
                          }}
                        />
                      </FormControl>
                      <p
                        onClick={handleSendOTP}
                        className="text-blue-400 hover:text-blue-600 duration-300 ease-in-out font-medium hover:cursor-pointer"
                      >
                        Send OTP
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">
                        Enter your OTP
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the OTP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <span className="flex gap-x-2 items-center">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Please Wait
                    </span>
                  ) : (
                    <span>Verify OTP</span>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col gap-y-3"></CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AtLoginTimeVerify;
