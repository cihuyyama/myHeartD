"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as tf from '@tensorflow/tfjs';
// @ts-ignore
import * as tfdf from '@tensorflow/tfjs-tfdf';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [model, setModel] = useState<tfdf.TFDFModel | null>(null);
  const [backendReady, setBackendReady] = useState(false);
  const [result, setResult] = useState<number | undefined>(undefined);

  useEffect(() => {
    const initializeBackend = async () => {
      try {
        tfdf.setLocateFile((path: any, base: any) => {
          return `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tfdf/dist/${path}`;
        });
        console.log('backend ready');
        setBackendReady(true);
      } catch (error) {
        console.error('Failed to initialize backend', error);
      }
    };

    initializeBackend();
  }, []);

  const formSchema = z.object({
    sex: z.string().min(1).max(50),
    generalhealth: z.string().min(1).max(50),
    physicalhealthdays: z.string().min(1).max(50),
    mentalhealthdays: z.string().min(1).max(50),
    lastcheckuptime: z.string().min(1).max(50),
    physicalactivities: z.string().min(1).max(50),
    sleephours: z.string().min(1).max(50),
    removedteeth: z.string().min(1).max(50),
    hadstroke: z.string().min(1).max(50),
    hadasthma: z.string().min(1).max(50),
    hadskincancer: z.string().min(1).max(50),
    hadcopd: z.string().min(1).max(50),
    haddepressivedisorder: z.string().min(1).max(50),
    hadkidneydisease: z.string().min(1).max(50),
    hadarthritis: z.string().min(1).max(50),
    haddiabetes: z.string().min(1).max(50),
    deaforhardofhearing: z.string().min(1).max(50),
    blindorvisiondifficulty: z.string().min(1).max(50),
    difficultyconcentrating: z.string().min(1).max(50),
    difficultywalking: z.string().min(1).max(50),
    difficultydressingbathing: z.string().min(1).max(50),
    difficultyerrands: z.string().min(1).max(50),
    smokerstatus: z.string().min(1).max(50),
    ecigaretteusage: z.string().min(1).max(50),
    chestscan: z.string().min(1).max(50),
    raceethnicitycategory: z.string().min(1).max(50),
    agecategory: z.string().min(1).max(50),
    heightinmeters: z.string().min(1).max(50),
    bmi: z.string().min(1).max(50),
    alcoholdrinkers: z.string().min(1).max(50),
    hivtesting: z.string().min(1).max(50),
    fluvaxlast12: z.string().min(1).max(50),
    pneumovaxever: z.string().min(1).max(50),
    tetanuslast10tdap: z.string().min(1).max(50),
    highrisklastyear: z.string().min(1).max(50),
    covidpos: z.string().min(1).max(50),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sex: "",
      generalhealth: "",
      physicalhealthdays: "",
      mentalhealthdays: "",
      lastcheckuptime: "",
      physicalactivities: "",
      sleephours: "",
      removedteeth: "",
      hadstroke: "",
      hadasthma: "",
      hadskincancer: "",
      hadcopd: "",
      haddepressivedisorder: "",
      hadkidneydisease: "",
      hadarthritis: "",
      haddiabetes: "",
      deaforhardofhearing: "",
      blindorvisiondifficulty: "",
      difficultyconcentrating: "",
      difficultywalking: "",
      difficultydressingbathing: "",
      difficultyerrands: "",
      smokerstatus: "",
      ecigaretteusage: "",
      chestscan: "",
      raceethnicitycategory: "",
      agecategory: "",
      heightinmeters: "",
      bmi: "",
      alcoholdrinkers: "",
      hivtesting: "",
      fluvaxlast12: "",
      pneumovaxever: "",
      tetanuslast10tdap: "",
      highrisklastyear: "",
      covidpos: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    if (!model) {
      console.error('Model is not loaded yet');
      return;
    }
    console.log(tf.getBackend());

    const inputData = {
      'state': tf.tensor([0], [1], 'int32'),
      'sex': tf.tensor([parseInt(values.sex)], [1], 'int32'),
      'generalhealth': tf.tensor([parseInt(values.generalhealth)], [1], 'int32'),
      'physicalhealthdays': tf.tensor([parseFloat(values.physicalhealthdays)], [1], 'float32'),
      'mentalhealthdays': tf.tensor([parseFloat(values.mentalhealthdays)], [1], 'float32'),
      'lastcheckuptime': tf.tensor([parseInt(values.lastcheckuptime)], [1], 'int32'),
      'physicalactivities': tf.tensor([parseInt(values.physicalactivities)], [1], 'int32'),
      'sleephours': tf.tensor([parseFloat(values.sleephours)], [1], 'float32'),
      'removedteeth': tf.tensor([parseInt(values.removedteeth)], [1], 'int32'),
      'hadstroke': tf.tensor([parseInt(values.hadstroke)], [1], 'int32'),
      'hadasthma': tf.tensor([parseInt(values.hadasthma)], [1], 'int32'),
      'hadskincancer': tf.tensor([parseInt(values.hadskincancer)], [1], 'int32'),
      'hadcopd': tf.tensor([parseInt(values.hadcopd)], [1], 'int32'),
      'haddepressivedisorder': tf.tensor([parseInt(values.haddepressivedisorder)], [1], 'int32'),
      'hadkidneydisease': tf.tensor([parseInt(values.hadkidneydisease)], [1], 'int32'),
      'hadarthritis': tf.tensor([parseInt(values.hadarthritis)], [1], 'int32'),
      'haddiabetes': tf.tensor([parseInt(values.haddiabetes)], [1], 'int32'),
      'deaforhardofhearing': tf.tensor([parseInt(values.deaforhardofhearing)], [1], 'int32'),
      'blindorvisiondifficulty': tf.tensor([parseInt(values.blindorvisiondifficulty)], [1], 'int32'),
      'difficultyconcentrating': tf.tensor([parseInt(values.difficultyconcentrating)], [1], 'int32'),
      'difficultywalking': tf.tensor([parseInt(values.difficultywalking)], [1], 'int32'),
      'difficultydressingbathing': tf.tensor([parseInt(values.difficultydressingbathing)], [1], 'int32'),
      'difficultyerrands': tf.tensor([parseInt(values.difficultyerrands)], [1], 'int32'),
      'smokerstatus': tf.tensor([parseInt(values.smokerstatus)], [1], 'int32'),
      'ecigaretteusage': tf.tensor([parseInt(values.ecigaretteusage)], [1], 'int32'),
      'chestscan': tf.tensor([parseInt(values.chestscan)], [1], 'int32'),
      'raceethnicitycategory': tf.tensor([parseInt(values.raceethnicitycategory)], [1], 'int32'),
      'agecategory': tf.tensor([parseInt(values.agecategory)], [1], 'int32'),
      'heightinmeters': tf.tensor([parseFloat(values.heightinmeters) / 100], [1], 'float32'),
      'bmi': tf.tensor([parseFloat(values.bmi)], [1], 'float32'),
      'alcoholdrinkers': tf.tensor([parseInt(values.alcoholdrinkers)], [1], 'int32'),
      'hivtesting': tf.tensor([parseInt(values.hivtesting)], [1], 'int32'),
      'fluvaxlast12': tf.tensor([parseInt(values.fluvaxlast12)], [1], 'int32'),
      'pneumovaxever': tf.tensor([parseInt(values.pneumovaxever)], [1], 'int32'),
      'tetanuslast10tdap': tf.tensor([parseInt(values.tetanuslast10tdap)], [1], 'int32'),
      'highrisklastyear': tf.tensor([parseInt(values.highrisklastyear)], [1], 'int32'),
      'covidpos': tf.tensor([parseInt(values.covidpos)], [1], 'int32'),
    };

    try {
      console.log(model.inputs)
      console.log(inputData)
      const result = await model.executeAsync(inputData);
      console.log('Model execution result:', result);
      console.log('Model execution result:', result.dataSync()[0]);
      setResult(result.dataSync()[0]);
    } catch (error) {
      console.error('Error executing model:', error);
    }
  }

  const handleLoad = async () => {
    if (!backendReady) {
      toast.error("Backend is not ready yet.");
      return;
    }

    try {
      const loadedModel = await tfdf.loadTFDFModel(`${window.location.href}tfjs_under_over/model.json`);
      setModel(loadedModel);
      toast.success('Model loaded successfully');
      console.log('Model loaded:', loadedModel);
    } catch (error) {
      toast.error('Failed to load the model');
      console.error('Error loading model:', error);
    }
  };

  const handleRun = async () => {
    if (!model) {
      console.error('Model is not loaded yet');
      return;
    }
    console.log(tf.getBackend());

    const inputData = {
      'state': tf.tensor([0], [1], 'int32'),
      'sex': tf.tensor([1], [1], 'int32'),
      'generalhealth': tf.tensor([2], [1], 'int32'),
      'physicalhealthdays': tf.tensor([5.0], [1], 'float32'),
      'mentalhealthdays': tf.tensor([0.0], [1], 'float32'),
      'lastcheckuptime': tf.tensor([3], [1], 'int32'),
      'physicalactivities': tf.tensor([1], [1], 'int32'),
      'sleephours': tf.tensor([5.0], [1], 'float32'),
      'removedteeth': tf.tensor([1], [1], 'int32'),
      'hadstroke': tf.tensor([0], [1], 'int32'),
      'hadasthma': tf.tensor([0], [1], 'int32'),
      'hadskincancer': tf.tensor([1], [1], 'int32'),
      'hadcopd': tf.tensor([0], [1], 'int32'),
      'haddepressivedisorder': tf.tensor([0], [1], 'int32'),
      'hadkidneydisease': tf.tensor([0], [1], 'int32'),
      'hadarthritis': tf.tensor([1], [1], 'int32'),
      'haddiabetes': tf.tensor([0], [1], 'int32'),
      'deaforhardofhearing': tf.tensor([0], [1], 'int32'),
      'blindorvisiondifficulty': tf.tensor([0], [1], 'int32'),
      'difficultyconcentrating': tf.tensor([1], [1], 'int32'),
      'difficultywalking': tf.tensor([1], [1], 'int32'),
      'difficultydressingbathing': tf.tensor([0], [1], 'int32'),
      'difficultyerrands': tf.tensor([0], [1], 'int32'),
      'smokerstatus': tf.tensor([0], [1], 'int32'),
      'ecigaretteusage': tf.tensor([3], [1], 'int32'),
      'chestscan': tf.tensor([1], [1], 'int32'),
      'raceethnicitycategory': tf.tensor([4], [1], 'int32'),
      'agecategory': tf.tensor([8], [1], 'int32'),
      'heightinmeters': tf.tensor([1.88], [1], 'float32'),
      'bmi': tf.tensor([30.9], [1], 'float32'),
      'alcoholdrinkers': tf.tensor([0], [1], 'int32'),
      'hivtesting': tf.tensor([0], [1], 'int32'),
      'fluvaxlast12': tf.tensor([1], [1], 'int32'),
      'pneumovaxever': tf.tensor([1], [1], 'int32'),
      'tetanuslast10tdap': tf.tensor([2], [1], 'int32'),
      'highrisklastyear': tf.tensor([0], [1], 'int32'),
      'covidpos': tf.tensor([0], [1], 'int32'),
      // 'heartdisease': tf.tensor([0], [1], 'int32')
    };

    try {
      console.log(model.inputs)
      console.log(inputData)
      const result = await model.executeAsync(inputData);
      console.log('Model execution result:', result);
      console.log('Model execution result:', result.dataSync()[0]);
      setResult(result.dataSync()[0]);
    } catch (error) {
      console.error('Error executing model:', error);
    }
  };

  return (
    <main className="w-full h-full flex flex-col justify-start items-center gap-4 mt-10 md:px-0 px-6">
      <h1 className="text-xl font-semibold">
        AI Deteksi Penyakit Jantung Koroner
      </h1>
      <Separator className="max-w-[800px]" />
      <h3 className="text-sm text-gray-500">
        Silahkan isi form berikut untuk mendeteksi penyakit jantung
      </h3>
      <div className="border-2 border-gray-500 px-4 py-2 shadow-lg rounded-lg max-w-[800px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      Sex of Respondent
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sex" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Female</SelectItem>
                      <SelectItem value="1">Male</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="generalhealth"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      Would you say that in general your health is:
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="General Health" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Excellent</SelectItem>
                      <SelectItem value="4">Very Good</SelectItem>
                      <SelectItem value="2">Good</SelectItem>
                      <SelectItem value="1">Fair</SelectItem>
                      <SelectItem value="3">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="physicalhealthdays"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      Now thinking about your physical health, which includes physical illness and injury, for how many days during the past 30 days was your physical health not good?
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Physical Health Days" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0.00">0 Day</SelectItem>
                      <SelectItem value="1.00">1 Day</SelectItem>
                      {Array.from({ length: 29 }, (_, index) => (
                        <SelectItem key={index + 2} value={(index + 2).toFixed(2)}>
                          {index + 2} Days
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
              name="mentalhealthdays"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      Now thinking about your mental health, which includes stress, depression, and problems with emotions, for how many days during the past 30 days was your mental health not good?
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Mental Health Days" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0.00">0 Day</SelectItem>
                      <SelectItem value="1.00">1 Day</SelectItem>
                      {Array.from({ length: 29 }, (_, index) => (
                        <SelectItem key={index + 2} value={(index + 2).toFixed(2)}>
                          {index + 2} Days
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
              name="lastcheckuptime"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      About how long has it been since you last visited a doctor for a routine checkup?
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Last Check-up time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="3">Within past year (anytime less than 12 months ago)</SelectItem>
                      <SelectItem value="1">Within past 2 years (1 year but less than 2 years ago)</SelectItem>
                      <SelectItem value="2">Within past 5 years (2 years but less than 5 years ago)</SelectItem>
                      <SelectItem value="0">5 or more years ago</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="physicalactivities"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      During the past month, other than your regular job, did you participate in any physical activities or exercises such as running, calisthenics, golf, gardening, or walking for exercise?
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Physical Activities" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sleephours"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      On average, how many hours of sleep do you get in a 24-hour period?
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sleep Hours" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1.00">1 Hour</SelectItem>
                      {Array.from({ length: 23 }, (_, index) => (
                        <SelectItem key={index + 2} value={(index + 2).toFixed(2)}>
                          {index + 2} Hours
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
              name="removedteeth"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      Not including teeth lost for injury or orthodontics, how many of your permanent teeth have been removed because of tooth decay or gum disease?
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Removed Teeth" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="3">None of them</SelectItem>
                      <SelectItem value="0">1 to 5</SelectItem>
                      <SelectItem value="1">6 or more, but not all</SelectItem>
                      <SelectItem value="2">All</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hadstroke"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      (Ever told) (you had) a stroke.
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Had Stroke" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hadasthma"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      (Ever told) (you had) asthma?
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Had asthma" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hadskincancer"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      (Ever told) (you had) skin cancer that is not melanoma?
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Had Skin Cancer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hadcopd"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      (Ever told) (you had) C.O.P.D. (chronic obstructive pulmonary disease), emphysema or chronic bronchitis?
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Had COPD" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="haddepressivedisorder"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      (Ever told) (you had) a depressive disorder (including depression, major depression, dysthymia, or minor depression)?
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Had Depressive Disorder" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hadkidneydisease"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      Not including kidney stones, bladder infection or incontinence, were you ever told you had kidney disease?
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Had Kidney Disease" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hadarthritis"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      (Ever told) (you had) some form of arthritis, rheumatoid arthritis, gout, lupus, or fibromyalgia?  (Arthritis diagnoses include: rheumatism, polymyalgia rheumatica; osteoarthritis (not osteporosis); tendonitis, bursitis, bunion, tennis elbow; carpal tunnel syndrome, tarsal tunnel syndrome; joint infection, etc.)
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Had Arthritis" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="haddiabetes"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      (Ever told) (you had) diabetes?
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Had Diabetes" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deaforhardofhearing"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      Are you deaf or do you have serious difficulty hearing?
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Deaf or hard of hearing" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="blindorvisiondifficulty"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      Are you blind or do you have serious difficulty seeing, even when wearing glasses?
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Blind or vision dificulty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficultyconcentrating"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      Because of a physical, mental, or emotional condition, do you have serious difficulty concentrating, remembering, or making decisions?
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Dificulty Concentrating" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficultywalking"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      Do you have serious difficulty walking or climbing stairs?
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Dificulty Walking" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficultydressingbathing"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      Do you have difficulty dressing or bathing?
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Dificulty dressing/bathing" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficultyerrands"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      Because of a physical, mental, or emotional condition, do you have difficulty doing errands alone such as visiting a doctor´s office or shopping?
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Dificulty Errands" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="smokerstatus"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      Four-level smoker status:  Everyday smoker, Someday smoker, Former smoker, Non-smoker
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Somker Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="3">Never smoked</SelectItem>
                      <SelectItem value="2">Former Smoker</SelectItem>
                      <SelectItem value="1">Current smoker - now smokes some days</SelectItem>
                      <SelectItem value="0">Current smoker - now smokes every day</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ecigaretteusage"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      Would you say you have never used e-cigarettes or other electronic vaping products in your entire life or now use them every day, use them some days, or used them in the past but do not currently use them at all?
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="E-Cigarette Usage" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Never used e-cigarettes in my entire life</SelectItem>
                      <SelectItem value="1">Not at all (right now)</SelectItem>
                      <SelectItem value="3">Use them some days</SelectItem>
                      <SelectItem value="2">Use them every day</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="chestscan"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      Have you ever had a CT or CAT scan of your chest area?
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chest scan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="raceethnicitycategory"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      Five-level race/ethnicity category
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Race ethnic" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="4">White only, Non-Hispanic</SelectItem>
                      <SelectItem value="0">Black only, Non-Hispanic</SelectItem>
                      <SelectItem value="3">Other race only, Non-Hispanic</SelectItem>
                      <SelectItem value="2">Multiracial, Non-Hispanic</SelectItem>
                      <SelectItem value="1">Hispanic</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="agecategory"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      Fourteen-level age category
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Age category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((value, index) => (
                        <SelectItem key={index} value={value.toString()}>
                          Age {['80 or older', '75 to 79', '70 to 74', '60 to 64', '65 to 69', '55 to 59', '50 to 54', '45 to 49', '40 to 44', '35 to 39', '30 to 34', '25 to 29', '18 to 24'][value]}
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
              name="heightinmeters"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Reported height in centimeters
                  </FormDescription>
                  <Input type="number" placeholder="Height in Centimeter" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bmi"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Body Mass Index (BMI) in kg
                  </FormDescription>
                  <Input type="number" placeholder="Body mass index" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alcoholdrinkers"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      Adults who reported having had at least one drink of alcohol in the past 30 days.
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Drinker" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hivtesting"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      Adults who have ever been tested for HIV
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="HIV test" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fluvaxlast12"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      During the past 12 months, have you had either flu vaccine that was sprayed in your nose or flu shot injected into your arm?
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Flu vaccine" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pneumovaxever"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      Have you ever had a pneumonia shot also known as a pneumococcal vaccine?
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pneumonia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tetanuslast10tdap"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      Have you received a tetanus shot in the past 10 years? Was this Tdap, the tetanus shot that also has pertussis or whooping cough vaccine?
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Tetanus" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">No, did not receive any tetanus shot in the past 10 years</SelectItem>
                      <SelectItem value="2">Yes, received tetanus shot but not sure what type</SelectItem>
                      <SelectItem value="3">Yes, received tetanus shot, but not Tdap</SelectItem>
                      <SelectItem value="1">Yes, received Tdap</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="highrisklastyear"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      You have injected any drug other than those prescribed for you in the past year. You have been treated for a sexually transmitted disease or STD in the past year. You have given or received money or drugs in exchange for sex in the past year.
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="High Risk" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="covidpos"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormDescription>
                      Has a doctor, nurse, or other health professional ever told you that you tested positive for COVID 19?
                    </FormDescription>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Covid-19 test" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[0, 2, 1].map((value, index) => (
                        <SelectItem key={index} value={value.toString()}>
                          {['No', 'Yes', 'Tested positive using home test without a health professional'][value]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col w-fit gap-4">
              <Button onClick={handleLoad} disabled={!backendReady}>
                Load Model
              </Button>

              <Button type="submit" disabled={!model} >Submit</Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="border-2 border-gray-500 px-4 py-2 shadow-lg rounded-lg max-w-[800px] mb-[100px]">
        <p>Result: {result && (result < 0.5 ? "Doesn't have Heart Disease" : "Have heart disease")}</p>
        <p>Confidence: {result && (result < 0.5 ? `${100 - Number((100 * result).toFixed(2))} %` : `${Number((100 * result).toFixed(2))} %`)}</p>
      </div>
    </main>
  );
}
