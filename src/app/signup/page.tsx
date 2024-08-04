"use client";
import { Loader2 } from 'lucide-react';
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
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { SignupUser } from "../../../actions/Signup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signupResolver, signupSchema } from "@/types/SchemaSignup";
import { useToast } from "@/components/ui/use-toast"
import VerifyEmail from '@/components/pages/VerifyEmail';


const Signup = () => {
  const { toast } = useToast();
  const [isVerifyEmail, setVerifyEmail] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSignup = async (data: signupSchema) => {
  try {
    setIsLoading(true);
    const res = await SignupUser(data);
    if(!res.status){
      throw new Error(res.message);
    }

    toast({
      title: res.message,
      description: "After this, Please Verify your Email"
    })
    setVerifiedEmail(data.email);
    setVerifyEmail(true);
  } catch (error: any) {
    // console.log(error);
    toast({
      title: error.message,
      description: "Please Try again, after Sometime"
    })
  }
  finally{
    setIsLoading(false);
  }
  };


  const form = useForm<signupSchema>({
    resolver: signupResolver,
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <>
    {!isVerifyEmail ? (<div className="h-screen w-screen flex justify-center items-center bg-gray-900">
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
              Join SuperCars
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSignup)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Email.." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name.." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Password.." type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isLoading} className={`w-full ${isLoading} ?  bg-gray-800: `}>
                  {isLoading ? <span className='flex gap-x-2 items-center'><Loader2 className="h-4 w-4 animate-spin" />Please Wait</span> : <span>Create Account</span>}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col gap-y-3">
            {/* <form
              action=""
              className="ease-in-out duration-300 w-full font-medium"
            >
              <Button
                variant="outline"
                className="w-full gap-x-2 hover:bg-gray-300"
              >
                <FcGoogle className="text-xl" />
                Signup with Google
              </Button>
            </form> */}
            <Link href="/login" className="text-blue-600">
              Already have an account?
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>) : (<VerifyEmail myEmail={verifiedEmail}/>)}
    </>
  );
};

export default Signup;
