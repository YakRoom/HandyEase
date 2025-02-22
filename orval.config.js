module.exports = {
  api: {
    input: "http://localhost:3000/swagger.json",
    output: {
      target: "./apis/generated.ts",
      client: "react-query",
      mode: "split",
      override: {
        mutator: {
          path: "./apis/axiosInstance.ts",
          name: "customInstance",
        },
      },
    },
  },
};
