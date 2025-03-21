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

const formSchema = z.object({
    difficulty: z.string({
        required_error: "Please select a difficulty level.",
    }),
    topic: z.string({
        required_error: "Please select a topic.",
    }),
    quizType: z.string({
        required_error: "Please select a quizType.",
    }),
    quantity: z.number().min(5, "Minimum 5 questions").max(20, "Maximum 20 questions"),
    timeLimit: z.number().min(5, "Minimum 5 minutes").max(60, "Maximum 60 minutes"),
});

export default function QuizForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            difficulty: "",  // Ensure default value is set
            topic: "",
            quantity: 10,
            timeLimit: 15,
            quizType: ""
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setLoading(true);

        console.log(values); // Debugging purpose
        alert(`Submitted Values:\n${JSON.stringify(values, null, 2)}`);

        axios.post("http://localhost:5000/generate-quiz", values)
            .then(res => console.log(res.data))

        setTimeout(() => {
            setLoading(false);
            router.push(
                `/Quizzes/quiz?difficulty=${values.difficulty}&topic=${values.topic}&questions=${values.quantity}&time=${values.timeLimit}`
            );
        }, 1000);
    };

    return (
        <Card className="border-primary/20 shadow-md">
            <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                        {/* Difficulty Select */}
                        <FormField
                            control={form.control}
                            name="difficulty"
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
                            name="topic"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>topic</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a topic" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="math">Mathematics</SelectItem>
                                            <SelectItem value="science">Science</SelectItem>
                                            <SelectItem value="history">History</SelectItem>
                                            <SelectItem value="literature">Literature</SelectItem>
                                            <SelectItem value="geography">Geography</SelectItem>
                                            <SelectItem value="computer-science">Computer Science</SelectItem>
                                            <SelectItem value="general-knowledge">General Knowledge</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>Select the topic area for your quiz questions.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="quizType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quiz Type</FormLabel>
                                    {/* Input field for quizType */}
                                    <FormControl>
                                        <input
                                            type="text"
                                            value={field.value || ''} // Ensures value is controlled and falls back to empty string
                                            onChange={field.onChange}  // Ensures React Hook Form tracks changes
                                            placeholder="Enter quiz type" // Placeholder for input field
                                        />
                                    </FormControl>
                                    <FormDescription>Enter the type of quiz you want to create.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        {/* Number of Questions Slider */}
                        <FormField
                            control={form.control}
                            name="quantity"
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
                            name="timeLimit"
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
