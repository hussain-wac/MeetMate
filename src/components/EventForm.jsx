import React from "react";
import useEventadd from "../hooks/useEventadd";

// Import shadcn UI components
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";

const EventForm = ({ onAddEvent }) => {
  const { title, setTitle, start, setStart, end, setEnd, handleSubmit: handleEventSubmit } = useEventadd(onAddEvent);
  
  // Set up react-hook-form (used by shadcn UI Form)
  const form = useForm({
    defaultValues: {
      title: "",
      start: "",
      end: ""
    }
  });

  const onSubmit = () => {
    handleEventSubmit();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter event title" 
                  value={title} 
                  onChange={(e) => {
                    setTitle(e.target.value);
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="start"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start</FormLabel>
              <FormControl>
                <Input 
                  type="datetime-local" 
                  value={start}
                  onChange={(e) => {
                    setStart(e.target.value);
                    field.onChange(e);
                  }}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="end"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End</FormLabel>
              <FormControl>
                <Input 
                  type="datetime-local" 
                  value={end}
                  onChange={(e) => {
                    setEnd(e.target.value);
                    field.onChange(e);
                  }}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Add Event
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;