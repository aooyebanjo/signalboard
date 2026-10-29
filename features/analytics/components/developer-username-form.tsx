"use client"

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  validateGithubUsername,
} from "../utils/validate-github-username";

interface DeveloperUsernameFormProps {
  username: string;
  onSubmit: (username: string) => void;
};

export function DeveloperUsernameForm({
  username,
  onSubmit
}: DeveloperUsernameFormProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setValue(username);
    setError("");
  },
    [username]
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedUsername = value.trim().toLowerCase();

    if (!validateGithubUsername(normalizedUsername)) {
      setError("Please enter a valid Github username");
      return;
    }

    setError("");
    onSubmit(normalizedUsername);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3"
    >
      <label
        htmlFor="analytics-username"
        className="block text-sm font-medium"
      >
        Github Username
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="analytics-username"
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);

            if (error) {
              setError("");
            }
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "analytics-username-error" : undefined}
          placeholder="Enter Github Username"
          autoComplete="off"
          className="min-w-0 flex-1 rounded-md border bg-background px-3 py-2 text-sm"
        />

        <button
          type="submit"
          className="rounded-md border px-5 py-2 text-sm font-medium hover:bg-muted"
        >
          Analyze
        </button>
      </div>

      {error && (
        <p
          id="analytics-username-error"
          role="alert"
          className="text-sm text-destructive"
        >
          {error}
        </p>
      )}
    </form>
  )
};













