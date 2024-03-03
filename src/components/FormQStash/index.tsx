"use client";

// Imports
// ========================================================
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

// Validation
// ========================================================
const MessageSchema = z.object({
  delay: z.string(),
  message: z
    .string()
    .transform((val) => val.trim())
    .pipe(z.string().min(1)),
});

// Types
// ========================================================
interface Inputs {
  delay: string;
  message: string;
}

// Main Component
// ========================================================
const FormQStash = () => {
  // Hooks
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      delay: "",
      message: "",
    },
  });
  const [payload, setPayload] = useState({
    delay: "",
    message: "",
  });

  // Requests
  const { mutate, isPending, data, isError } = useMutation({
    mutationFn: async (data: { [key: string]: any }) => {
      const response = await fetch(`/api/schedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
  });

  // Functions
  /**
   *
   * @param data
   * @returns
   */
  const onSubmitForm = (data: any) => {
    let message = "";
    try {
      // validate json
      const parsed = JSON.parse(data.message);
      message = JSON.stringify(parsed);

      setPayload({
        delay: data.delay,
        message,
      });
    } catch (error) {
      message = JSON.stringify({ message: data.message });
      setPayload({
        delay: data.delay,
        message,
      });
    }
    mutate({ delay: data.delay, message });
  };

  // Return
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div>
          <h2>Schedule Message</h2>
        </div>
        <div>
          <label htmlFor="delay">Delay</label>
          <select
            disabled={isPending}
            required
            id="delay"
            {...register("delay", { required: true })}
            aria-invalid={errors.delay ? "true" : "false"}
          >
            <option disabled value="">
              Select Delay
            </option>
            <option value="10s">10s</option>
            <option value="1m">1m</option>
            <option value="1m">2m</option>
          </select>
        </div>

        <div>
          <label htmlFor="message">Message (JSON Payload)</label>
          <textarea
            disabled={isPending}
            placeholder={`{ "hello": "there" }`}
            required
            rows={10}
            id="message"
            {...register("message", { required: true })}
            aria-invalid={errors.message ? "true" : "false"}
          />
          {errors.message && <p role="alert">{errors.message.message}</p>}
        </div>
        <div>
          <button type="submit" disabled={isPending}>
            {isPending ? (
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
              "Schedule"
            )}
          </button>
        </div>
        {isError ? <p role="alert">Error scheduling message.</p> : null}
        {data ? <p role="status">Message scheduled.<br />{data?.data?.[0]?.id}</p> : null}
      </form>
      <div>
        <h2>Payload</h2>
        <p>Example request being made in the backend.</p>
        <pre>
          <code>
            <span className="yellow">curl</span>{" "}
            <span className="blue">-X</span> POST \<br />
            &nbsp;&nbsp;https://qstash.upstash.com/v2/publish/
            {process.env.NEXT_PUBLIC_API_URL} \<br />
            &nbsp;&nbsp;<span className="blue">-H</span>{" "}
            <span className="red">'Content-Type: application/json' \</span>
            <br />
            &nbsp;&nbsp;<span className="blue">-H</span>{" "}
            <span className="red">
              'Authorization: Bearer &lt;QSTASH_TOKEN&gt;' \
            </span>
            <br />
            &nbsp;&nbsp;<span className="blue">-H</span>{" "}
            <span className="red">'Upstash-Delay: {payload.delay}' \</span>
            <br />
            &nbsp;&nbsp;<span className="blue">-d</span>{" "}
            <span className="red">'{payload.message}'</span>
          </code>
        </pre>
      </div>
    </section>
  );
};

// Exports
// ========================================================
export default FormQStash;
