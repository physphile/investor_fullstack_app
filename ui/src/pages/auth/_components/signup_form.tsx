import { Envelope, Lock, Person } from "@gravity-ui/icons";
import { Form, FormGrid } from "@kit/ui";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../../api/auth";
import { useStoreFetch } from "../../../shared/hooks/use_store_fetch";
import { HttpError } from "../../../shared/ui/httpError";
import { AuthButton } from "./_button";
import { AuthInput } from "./_input";

interface FormProps {
  email: string;
  username: string;
  password: string;
  repeatPassword?: string;
}

const styles = {
  initial: {
    opacity: 0.4,
    y: 300,
  },
  animate: {
    opacity: 1,
    display: "flex",
    y: 0,
  },
  transition: {
    duration: 0.4,
    ease: "backOut",
  },
};

export const SignUpForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const form = useForm<FormProps>();
  const [httpError, setHttpError] = useState();
  const {
    register,
    setError,
    formState: { errors },
  } = form;
  const { fetch } = useStoreFetch(
    useAuthStore((state) => state.signUp),
    {
      onSuccess,
      onError: setHttpError,
    }
  );

  const handleSubmit = async (data: FormProps) => {
    if (data.password !== data?.repeatPassword) {
      setError("repeatPassword", {
        message: "Password mismatch",
      });
      return;
    }
    const mutable = structuredClone(data);
    delete mutable.repeatPassword;
    await fetch(mutable);
  };
  return (
    <Form
      form={form}
      onSubmit={async (data) => {
        await handleSubmit(data);
        onSuccess?.();
      }}
      className="flex flex-col gap-2"
    >
      <FormGrid className="mb-12">
        <motion.span className="flex flex-col gap-2" {...styles}>
          <AuthInput
            Icon={Envelope}
            type="text"
            placeholder="Email"
            {...register("email", {
              required: true,
            })}
          />
          <AuthInput
            Icon={Person}
            type="text"
            placeholder="Username"
            {...register("username", {
              required: true,
            })}
          />
        </motion.span>
        <AuthInput
          Icon={Lock}
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
          })}
        />
        <AuthInput
          Icon={Lock}
          type="password"
          placeholder="Repeat password"
          {...register("repeatPassword", {
            required: true,
          })}
        />
        <HttpError error={httpError} />
      </FormGrid>
      <AuthButton>SIGN UP</AuthButton>
    </Form>
  );
};
