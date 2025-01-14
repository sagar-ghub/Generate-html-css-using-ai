'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useSession } from 'next-auth/react'
import { useState } from "react"
import Link from "next/link"
import { toast } from "react-toastify"

const FormSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  password: z.string().min(2, { message: "Password must be at least 2 characters." }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
})

const InputForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  if (session) router.push("/chat");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
      name: ""
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: data.username, password: data.password, name: data.name }),
      });

      if (res.status === 200) {
        toast.success("Registration successful!");
        router.push("/login");

      }
      else
      toast.error("Registration failed!");
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-teal-100 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md space-y-8">
        <h1 className="text-4xl font-semibold text-center text-gray-700 mb-6">Sign Up</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium text-gray-700">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      {...field}
                      className="w-full p-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium text-gray-700">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      {...field}
                      className="w-full p-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                    />
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
                  <FormLabel className="text-lg font-medium text-gray-700">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                      className="w-full p-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button
                type="submit"
                className={`w-full p-3 text-white font-semibold rounded-lg shadow-md transition ${loading ? 'bg-teal-400' : 'bg-teal-500 hover:bg-teal-600'}`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Loading...
                  </div>
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
            <div className="text-center mt-4">
              <span className="text-gray-600">Already a user? </span>
              <Link href="/login" className="text-teal-500 font-semibold hover:underline">
                Login here
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default InputForm;
