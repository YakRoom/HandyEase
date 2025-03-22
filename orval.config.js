module.exports = {
  api: {
    input: "https://api.yakroom.com/swagger.json",
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
