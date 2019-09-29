# Developer Web Interface for ReactOS

## About The Project

---

The Developer Web Interface for ReactOS is a web tool to support the development of ReactOS. The main goal of this project is to develop a platform for ReactOS developers to easily track Commits, Builds and Test details. The web Interface makes API calls to various endpoints of GitHub, BuildBot and Testman API and interrelates them and renders a simplified view of Commit, Build and Test details at one place.

### Installation

---

```bash
git clone https://github.com/reactos/developer-web-interface.git
npm install
cd client && npm install
```

> Create a .env file in root directory and include your GitHub API key ( check config-Env )

### Run Application

---

In the root directory

```bash
npm run dev
```
