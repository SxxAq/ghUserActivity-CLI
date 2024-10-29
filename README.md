Here's a comprehensive README.md for your GitHub Activity CLI project:

```markdown
# GitHub Activity CLI

A command-line interface tool that fetches and displays a GitHub user's recent activity in a beautifully formatted output.

## Features

- 🔍 Fetch recent GitHub activity for any user
- 📊 Display various types of GitHub events:
  - Push events with commit messages
  - Issue events (opened/closed)
  - Pull request activities
  - Repository watching/starring
  - Fork events
  - Branch creation/deletion
  - Repository creation
  - Comments on issues and commits
- 🎨 Colored and formatted output for better readability
- 📅 Events organized by date
- 📄 Pagination support to fetch more historical data
- 🔑 Secure authentication using GitHub token

## Installation

1. Clone the repository:
```bash
git clone https://github.com/SxxAq/ghUserActivity-CLI
cd ghUserActivity-CLI
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your GitHub token:
```env
GITHUB_TOKEN=your_github_token_here
```

## Getting a GitHub Token

1. Go to GitHub Settings -> Developer settings -> Personal access tokens
2. Click "Generate new token" (classic)
3. Give it a name and select the following scopes:
   - `repo` (Full control of private repositories)
   - `user` (Read all user profile data)
4. Copy the generated token and add it to your `.env` file

## Usage

Basic usage:
```bash
node index.js --user=<github-username>
```

With custom pages:
```bash
node index.js --user=<github-username> --pages=5
```

### Options

- `--user, -u`: GitHub username (required)
- `--pages, -p`: Number of pages to fetch (default: 3, max: 10)
- `--help`: Show help information

## Example Output

```
   _____ _ _   _           _     
  / ____(_) | | |         | |    
 | |  __ _| |_| |__  _   _| |__  
 | | |_ | | __| '_ \| | | | '_ \ 
 | |__| | | |_| | | | |_| | |_) |
  \_____|_|\__|_| |_|\__,_|_.__/ 
                                 
 Activity

2024-01-30
──────────────────────────────────
[1/30/2024, 15:45:30] Pushed 3 commit(s) to username/project:
  → Fix navigation bug
  → Update documentation
  → Add new feature

[1/30/2024, 14:20:15] Opened issue in username/project:
  → Add dark mode support

...
```

## Supported Events

- `PushEvent`: Code pushes
- `IssuesEvent`: Issue creation and updates
- `PullRequestEvent`: Pull request activities
- `WatchEvent`: Repository starring
- `ForkEvent`: Repository forking
- `CreateEvent`: Branch/repository creation
- `DeleteEvent`: Branch/tag deletion
- `CommitCommentEvent`: Commit comments
- `IssueCommentEvent`: Issue comments
- Other GitHub events are displayed with their type

## Dependencies

- `axios`: HTTP client for making API requests
- `chalk`: Terminal string styling
- `dotenv`: Environment variable management
- `figlet`: ASCII art text generator
- `yargs`: Command-line argument parsing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- GitHub API Documentation
- The developers of the dependencies used in this project

## Author

Your Name - [@SaalimAqueel](https://github.com/SxxAq)
