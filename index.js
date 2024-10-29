import dotenv from "dotenv";
import axios from "axios";
import yargs from "yargs";
import chalk from "chalk";
import figlet from "figlet";
dotenv.config({ path: "./" });

const TOKEN = process.env.GITHUB_TOKEN;

const user = "SxxAq";
const url = `https://api.github.com/users/${user}/events`;

const fetchUserEvent = async () => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: TOKEN,
      },
    });
    const activity = response.data;
    console.log(activity);
  } catch (error) {
    console.log("Couldnt fetch user Activity\n", error);
  }
};
fetchUserEvent();
