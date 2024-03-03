"use client";

// Imports
// ========================================================
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";

// Validation
// ========================================================
const MessageSchema = z.object({
  id: z.string().uuid(),
});

// Types
// ========================================================
interface Inputs {
  id: string;
}

// Main Component
// ========================================================
const Check = () => {
  // Hooks
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<Inputs>({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      id: "",
    },
  });

  // Requests
  const { refetch, isLoading, data, isError } = useQuery({
    queryKey: ["checkMessage"],
    queryFn: async () => {
      const { id } = getValues();
      const response = await fetch(`/api/messages/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.json();
    },
    enabled: false,
  });

  // Functions
  /**
   *
   * @param data
   * @returns
   */
  const onSubmitForm = () => {
    refetch();
  };

  // Hooks
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <h2>Check Message Result</h2>
        <div>
          <label htmlFor="id">Message ID</label>
          <input
            disabled={isLoading}
            required
            placeholder="Example: 1650e9ba-f80a-487b-ae06-3f6d7e2d0606"
            type="text"
            id="id"
            {...register("id", { required: true })}
          />
          {errors.id && <p role="alert">{errors.id.message}</p>}
        </div>
        <div>
          <button disabled={isLoading} type="submit">
            {isLoading ? (
              <span>
                <svg
                  version="1.1"
                  id="L9"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 100 100"
                  enable-background="new 0 0 0 0"
                  xmlSpace="preserve"
                >
                  <path
                    fill="#fff"
                    d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
                  >
                    <animateTransform
                      attributeName="transform"
                      attributeType="XML"
                      type="rotate"
                      dur="1s"
                      from="0 50 50"
                      to="360 50 50"
                      repeatCount="indefinite"
                    ></animateTransform>
                  </path>
                </svg>
              </span>
            ) : (
              "Check"
            )}
          </button>
        </div>
      </form>
      <div>
        <h2>Message</h2>
        <p>Received so far from QStash that is stored in the local database.</p>
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    </section>
  );
};

// Exports
// ========================================================
export default Check;
