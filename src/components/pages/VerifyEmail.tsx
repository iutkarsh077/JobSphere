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
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { any } from "zod";
import { GetVerifyEmail } from "../../../actions/verifyEmail";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const VerifyEmail = ({ myEmail }: { myEmail: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<any>({
    defaultValues: {
      otp: "",
    },
  });

  const handleVerifyEmail = async (data: any) => {
    try {
      setIsLoading(true);
      data.email = myEmail;
      const res = await GetVerifyEmail(data);
      if (!res.status) {
        throw new Error(res.message);
      }
      if (res.status) {
        router.push("/login");
      }
    } catch (error: any) {
      toast({
        title: error.message,
        description: "Please Try again, after Sometime",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-900">
      <div className=" block absolute top-0 left-0 h-full w-full">
        <Image
          src="/images/jobBG2.jpeg"
          alt="image"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
      </div>
      <div className="relative z-10 w-full max-w-md mx-auto opacity-90 bg-gray-800 ml-2 mr-2 md:ml-0 md:mr-0 p-6 rounded-lg shadow-5xl">
        <Card className="w-full bg-gray-800 border-gray-600">
          <CardHeader>
            <CardTitle className="text-gray-200 font-semibold flex justify-center">
              Verify your Email
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
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">OTP</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your OTP.." {...field} />
                      </FormControl>
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

export default VerifyEmail;
