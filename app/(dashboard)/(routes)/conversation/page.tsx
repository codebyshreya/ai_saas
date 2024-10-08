"use client"

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
  
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/empty";


// Define the shape of your form using a Zod schema. Read more in the Zod documentation.
const formSchema = z.object({
    prompt: z.string().min(1, {
        message: "Prompt is require"
    }),
})

// Define the shape of the chat messages
interface ChatMessage {
    role: "bot" | "user" ;
    content: string;
}

const conversation = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    //Define the form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    })
    const isLoading = form.formState.isSubmitting;
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userMessage: ChatMessage = {
        role: "user",
        content: values.prompt,
      };

      const response = await axios.post("/api/conversation", {
        messages: values.prompt,
      });
      const botMessage: ChatMessage = {
        role: "bot",
        content: response.data,
      };

      setMessages((current) => [...current, userMessage, botMessage]);
      form.reset();
      
    } catch (error: any) {
      console.log(error);
      
    } finally {
      router.refresh();
    }
    }
      return (
        <div>
            <Heading
                title="Conversation"
                description="Our most advanced AI conversation model."
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
             <div className="px-4 lg:px-8">
        <div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-10">
              <FormControl className="m-0 p-0">
                <Input placeholder="Start typing here..." {...field} disabled={isLoading} className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>Generate</Button>
      </form>
                    </Form>
          </div>
          <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && <Empty label="Start typing to have a conversation." />}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-8 w-full flex items-start gap-x-8 rounded-lg
                  ${message.role === "user" ? "bg-white border border-black/10" : "bg-muted"}`}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
            </div>
            </div>
                </div>
        </div>
    )
}

export default conversation;