import React, { useState } from "react";
import moment from "moment";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import useCalendar from "../hooks/useCalendar";

const EventForm = ({ initialStart, initialEnd, onClose }) => {
  // Accept onClose prop
  const { handleAddEvent } = useCalendar();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      title: "",
      organizer: "",
      project: "",
      start: initialStart
        ? moment(initialStart).format("YYYY-MM-DDTHH:mm")
        : "",
      end: initialEnd ? moment(initialEnd).format("YYYY-MM-DDTHH:mm") : "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    const eventData = {
      title: data.title,
      organizer: data.organizer,
      project: data.project,
      start: dayjs(data.start).toISOString(),
      end: dayjs(data.end).toISOString(),
    };

    try {
      await handleAddEvent(eventData);
      form.reset(); 
      onClose(); 
    } catch (error) {
      console.error("Error adding event:", error);
    } finally {
      setLoading(false);
    }
  };

  const projectOptions = [
    { value: "project1", label: "Project 1" },
    { value: "project2", label: "Project 2" },
    { value: "project3", label: "Project 3" },
  ];

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
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="organizer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organizer Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter organizer name"
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="project"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={loading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {projectOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                <Input type="datetime-local" {...field} disabled={loading} />
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
                <Input type="datetime-local" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Adding..." : "Add Event"}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
