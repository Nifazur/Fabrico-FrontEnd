// src/components/checkout/BillingDetailsForm.tsx
import React from "react";
import { type UseFormReturn, type ControllerRenderProps } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// ✅ Define form values interface
export interface BillingFormValues {
  firstName: string;
  lastName: string;
  country: string;
  street: string;
  apt?: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

interface Props {
  form: UseFormReturn<BillingFormValues>;
}

export const BillingDetailsForm: React.FC<Props> = ({ form }) => {
  return (
    <div className="bg-card p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-6">Billing Details</h2>
      <Form {...form}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }: { field: ControllerRenderProps<BillingFormValues, "firstName"> }) => (
              <FormItem>
                <FormLabel>First Name*</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }: { field: ControllerRenderProps<BillingFormValues, "lastName"> }) => (
              <FormItem>
                <FormLabel>Last Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }: { field: ControllerRenderProps<BillingFormValues, "country"> }) => (
              <FormItem>
                <FormLabel>Country / Region*</FormLabel>
                <FormControl>
                  <Input placeholder="Country / Region" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Street */}
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="street"
              render={({ field }: { field: ControllerRenderProps<BillingFormValues, "street"> }) => (
                <FormItem>
                  <FormLabel>Street Address*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="House number and street name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Apt */}
          <FormField
            control={form.control}
            name="apt"
            render={({ field }: { field: ControllerRenderProps<BillingFormValues, "apt"> }) => (
              <FormItem>
                <FormLabel>Apt, suite, unit</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* City */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }: { field: ControllerRenderProps<BillingFormValues, "city"> }) => (
              <FormItem>
                <FormLabel>City*</FormLabel>
                <FormControl>
                  <Input placeholder="Town / City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* State */}
          <FormField
            control={form.control}
            name="state"
            render={({ field }: { field: ControllerRenderProps<BillingFormValues, "state"> }) => (
              <FormItem>
                <FormLabel>State*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Dhaka Division">
                      Dhaka Division
                    </SelectItem>
                    <SelectItem value="Chittagong Division">
                      Chittagong Division
                    </SelectItem>
                    {/* Add other states/divisions */}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Zip Code */}
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }: { field: ControllerRenderProps<BillingFormValues, "zipCode"> }) => (
              <FormItem>
                <FormLabel>Postal Code*</FormLabel>
                <FormControl>
                  <Input placeholder="Postal Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }: { field: ControllerRenderProps<BillingFormValues, "phone"> }) => (
                <FormItem>
                  <FormLabel>Phone*</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </Form>
    </div>
  );
};