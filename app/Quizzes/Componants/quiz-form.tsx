"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import axios from 'axios';

import {
    Form, FormControl, FormDescription, FormField,
    FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    user: z.string({
        required_error: "Please enter your email",
    }),
    quizCriteria: z.object({
        difficulty: z.string({
            message: "Please select a difficulty level.",
        }),
        topic: z.string({
            required_error: "Please select a topic.",
        }),
        quizType: z.string({
            required_error: "Please select a quizType.",
        }),
        quantity: z.number().min(5, "Minimum 5 questions").max(20, "Maximum 20 questions"),
        timeLimit: z.number().min(5, "Minimum 5 minutes").max(60, "Maximum 60 minutes"),
    }).required(),

});

export default function QuizForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [quizSetId, setQuizSetId] = useState(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            user: "m@gmail.com",
            quizCriteria: {
                difficulty: "",  // Ensure default value is set
                topic: "",
                quantity: 10,
                timeLimit: 15,
                quizType: ""
            }
        },
    });
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
    
        console.log(values); // Debugging purpose
    
       
        try {
            const res = await axios.post("https://quiz-mania-iota.vercel.app/generate-quiz", values); 
            console.log(res.data);
            
            const quizSetId = res.data.result.insertedId; // Get the insertedId from the response
    
            setQuizSetId(quizSetId); // Store the insertedId
    
            // Wait for quizSetId to be set before redirecting
            router.push(
                `/Quizzes/quiz?difficulty=${values.quizCriteria.difficulty}&topic=${values.quizCriteria.topic}&questions=${values.quizCriteria.quantity}&time=${values.quizCriteria.timeLimit}&quizSetId=${quizSetId}`
            );
        } catch (error) {
            console.error("Error during quiz generation:", error);
            alert("Failed to generate quiz. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    

   

    return (
        <Card className="border-primary/20 shadow-md">
            <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                        {/* Difficulty Select */}
                        <FormField
                            control={form.control}
                            name="quizCriteria.difficulty"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Difficulty Level</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select difficulty level" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="easy">Easy</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="hard">Hard</SelectItem>
                                            <SelectItem value="expert">Expert</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>Choose how challenging you want your quiz to be.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* topic Select */}
                        <FormField
                            control={form.control}
                            name="quizCriteria.topic"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Topic</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            value={field.value || ""} // Ensure value is controlled
                                            onChange={field.onChange} // Correct event handler for controlled input
                                            placeholder="Enter topic"
                                        />
                                    </FormControl>
                                    <FormDescription>Select the topic area for your quiz questions.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/*quizType*/}

                        <FormField
                            control={form.control}
                            name="quizCriteria.quizType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quiz Type</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a Quiz type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="mcq">Multiple Choice</SelectItem>
                                            <SelectItem value="T/F">True/False</SelectItem>


                                        </SelectContent>
                                    </Select>
                                    <FormDescription>Select the topic area for your quiz questions.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Number of Questions Slider */}
                        <FormField
                            control={form.control}
                            name="quizCriteria.quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Number of Questions: {field.value}</FormLabel>
                                    <FormControl>
                                        <Slider
                                            min={5}
                                            max={20}
                                            step={1}
                                            value={[field.value]}
                                            onValueChange={(values) => field.onChange(values[0])}
                                        />
                                    </FormControl>
                                    <FormDescription>Choose between 5 and 20 questions.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Time Limit Slider */}
                        <FormField
                            control={form.control}
                            name="quizCriteria.timeLimit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Time Limit: {field.value} minutes</FormLabel>
                                    <FormControl>
                                        <Slider
                                            min={5}
                                            max={60}
                                            step={5}
                                            value={[field.value]}
                                            onValueChange={(values) => field.onChange(values[0])}
                                        />
                                    </FormControl>
                                    <FormDescription>Set a time limit between 5 and 60 minutes.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Generating Quiz..." : "Generate Quiz"}
                        </Button>

                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
