import defaultConfig from "@commitlint/config-conventional";

const commitlintConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", [...defaultConfig.rules["type-enum"][2], "wip"]],
  },
};

export default commitlintConfig;
