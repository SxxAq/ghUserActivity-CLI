import dotenv from "dotenv";
import axios from "axios";
import yargs from "yargs/yargs";
import chalk from "chalk";
import figlet from "figlet";

dotenv.config({ path: "./" });
const TOKEN = process.env.GITHUB_TOKEN;

const fetchUserEvents = async (username, pages = 3) => {
  try {
    let allEvents = [];
    
    // Fetch multiple pages of events
    for (let page = 1; page <= pages; page++) {
      const response = await axios.get(
        `https://api.github.com/users/${username}/events`,
        {
          headers: {
            Authorization: `${TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
          },
          params: {
            per_page: 100, // Maximum allowed per page
            page: page,
          },
        }
      );
      
      if (response.data.length === 0) break; // No more events
      allEvents = [...allEvents, ...response.data];
    }

    // Sort events by date
    allEvents.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
    return allEvents;
  } catch (error) {
    console.log(
      chalk.red("Couldn't fetch user Activity\n"),
      chalk.yellow(error.message)
    );
    return [];
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
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

  if (activity.length === 0) {
    console.log(chalk.yellow("No recent activity found."));
    return;
  }

  let currentDate = '';
  
  activity.forEach((event) => {
    const { type, repo, payload, created_at } = event;
    const eventDate = new Date(created_at).toLocaleDateString();
    
    // Print date header when date changes
    if (currentDate !== eventDate) {
      currentDate = eventDate;
      console.log(chalk.cyan.bold(`\n${eventDate}`));
      console.log(chalk.cyan.bold("─".repeat(30)));
    }

    switch (type) {
      case "PushEvent":
        console.log(
          chalk.green(
            `[${formatDate(created_at)}] Pushed ${
              payload.commits.length
            } commit(s) to ${repo.name}:`
          )
        );
        // Display commit messages
        payload.commits.forEach((commit) => {
          console.log(chalk.green(`  → ${commit.message}`));
        });
        break;

      case "IssuesEvent":
        if (payload.action === "opened") {
          console.log(
            chalk.blue(
              `[${formatDate(created_at)}] Opened issue in ${repo.name}:`
            )
          );
          console.log(chalk.blue(`  → ${payload.issue.title}`));
        } else if (payload.action === "closed") {
          console.log(
            chalk.blue(
              `[${formatDate(created_at)}] Closed issue in ${repo.name}:`
            )
          );
          console.log(chalk.blue(`  → ${payload.issue.title}`));
        }
        break;

      case "PullRequestEvent":
        console.log(
          chalk.magenta(
            `[${formatDate(created_at)}] ${payload.action} pull request in ${
              repo.name
            }:`
          )
        );
        console.log(chalk.magenta(`  → ${payload.pull_request.title}`));
        break;

      case "WatchEvent":
        if (payload.action === "started") {
          console.log(
            chalk.yellow(
              `[${formatDate(created_at)}] Starred ${repo.name}`
            )
          );
        }
        break;

      case "ForkEvent":
        console.log(
          chalk.green(
            `[${formatDate(created_at)}] Forked ${repo.name}`
          )
        );
        break;

      case "CreateEvent":
        if (payload.ref_type === "repository") {
          console.log(
            chalk.green(
              `[${formatDate(created_at)}] Created repository ${repo.name}`
            )
          );
        } else if (payload.ref_type === "branch") {
          console.log(
            chalk.green(
              `[${formatDate(created_at)}] Created branch ${
                payload.ref
              } in ${repo.name}`
            )
          );
        }
        break;

      case "DeleteEvent":
        if (payload.ref_type === "branch") {
          console.log(
            chalk.red(
              `[${formatDate(created_at)}] Deleted branch ${
                payload.ref
              } in ${repo.name}`
            )
          );
        } else if (payload.ref_type === "tag") {
          console.log(
            chalk.red(
              `[${formatDate(created_at)}] Deleted tag ${
                payload.ref
              } in ${repo.name}`
            )
          );
        }
        break;

      case "CommitCommentEvent":
        console.log(
          chalk.blue(
            `[${formatDate(created_at)}] Commented on commit in ${repo.name}`
          )
        );
        break;

      case "IssueCommentEvent":
        console.log(
          chalk.blue(
            `[${formatDate(created_at)}] Commented on issue in ${repo.name}:`
          )
        );
        console.log(chalk.blue(`  → ${payload.issue.title}`));
        break;

      default:
        console.log(
          chalk.gray(
            `[${formatDate(created_at)}] ${type} in ${repo.name}`
          )
        );
    }
  });
};

const argv = yargs(process.argv.slice(2))
  .scriptName("github-activity")
  .usage("$0 [options]")
  .option("user", {
    alias: "u",
    describe: "GitHub username",
    type: "string",
    demandOption: true,
  })
  .option("pages", {
    alias: "p",
    describe: "Number of pages to fetch (max 10)",
    type: "number",
    default: 3,
  })
  .help().argv;

// Main execution
(async () => {
  const events = await fetchUserEvents(argv.user, Math.min(argv.pages, 10));
  logUserActivity(events);
})();