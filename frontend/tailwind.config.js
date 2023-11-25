/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        bgc: "rgba(var(--color-background), <alpha-value>)",
        fgc: "rgba(var(--color-foreground), <alpha-value>)",
        content: "rgba(var(--color-content), <alpha-value>)",

        accent: {
          1: "rgba(var(--color-accent-main), <alpha-value>)",
          2: "rgba(var(--color-accent-alt), <alpha-value>)",
          like: "rgba(var(--color-accent-like), <alpha-value>)",
          Com: "rgba(var(--color-accent-com), <alpha-value>)"
        },
        message: {
          info: "rgba(var(--color-info), <alpha-value>)",
          error: "rgba(var(--color-error), <alpha-value>)",
          warning: "rgba(var(--color-warning), <alpha-value>)",
          success: "rgba(var(--color-success), <alpha-value>)"
        }
      }
    }
  },
  plugins: [require("@tailwindcss/container-queries")]
};
