const setEnv = () => {
  const fs = require("fs");
  const writeFile = fs.writeFile;
  // Configure Angular `environment.ts` file path
  const targetPath = "./src/environments/environment.ts";
  // Load node modules
  const colors = require("colors");
  require("dotenv").config({
    path: "src/environments/.env"
  });

  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
    apiUrl: '${process.env.apiUrl}',
    production: true,
  };
  `;
  console.log(colors.magenta("Overwriting `environment.ts`  \n"));
  writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        colors.green(
          `Angular environment.ts file generated correctly at ${targetPath} \n`
        )
      );
    }
  });
};

setEnv();
