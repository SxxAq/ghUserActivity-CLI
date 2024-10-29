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
    logUserActivity(activity);
  } catch (error) {
    console.log(
      chalk.red("Couldnt fetch user Activity\n"),
      chalk.yellow(error)
    );
  }
};

const logUserActivity = (activity) => {
  console.log(
    chalk.blue(
      figlet.textSync("Github Activity", {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
  activity.forEach((event) => {
    const { type, repo, payload } = event;

    switch (type) {
      case "PushEvent":
        console.log(
          chalk.green(
            `Pushed ${payload.commits.length} commit(s) to ${repo.name}`
          )
        );
        break;
      case "IssuesEvent":
        if (payload.action === "opened") {
          console.log(
            chalk.blue(
              `Opened a new issue in ${repo.name}: ${payload.issue.title}`
            )
          );
        } else if (payload.action === "closed") {
          console.log(
            chalk.blue(
              `Closed an issue in ${repo.name}: ${payload.issue.title}`
            )
          );
        }
        break;
      case "WatchEvent":
        if (payload.action === "started") {
          console.log(chalk.magenta(`Starred ${repo.name}`));
        }
        break;
      case "ForkEvent":
        console.log(chalk.green(`Forked ${repo.name}`));
        break;
      case "CreateEvent":
        if (payload.ref_type === "repository") {
          console.log(chalk.green(`Created repository ${repo.name}`));
        } else if (payload.ref_type === "branch") {
          console.log(
            chalk.green(`Created branch ${payload.ref} in ${repo.name}`)
          );
        }
        break;
      case "DeleteEvent":
        if (payload.ref_type === "branch") {
          console.log(
            chalk.red(`Deleted branch ${payload.ref} in ${repo.name}`)
          );
        } else if (payload.ref_type === "tag") {
          console.log(chalk.red(`Deleted tag ${payload.ref} in ${repo.name}`));
        }
        break;
      // Add more cases as needed
      default:
        console.log(chalk.gray(`${type} in ${repo.name}`));
    }
    // console.log(chalk.green(`- ${event.type}: ${event.repo.name}`));
  });
};

fetchUserEvent();
