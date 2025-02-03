# Country AI
![logo](./public/CountryAI.png)
[![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=fff)](#)
[![Apollo GraphQL](https://img.shields.io/badge/Apollo%20GraphQL-311C87?&style=for-the-badge&logo=Apollo%20GraphQL&logoColor=white)](#)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](#)
[![styled-components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=fff)](#)

>Country information with AI-powered chat capabilities, built with React, TypeScript, and GraphQL.

## Project Overview

Country AI provides users with detailed information about countries while offering an AI assistant to answer questions and provide insights about any country. The application features Google OAuth authentication, responsive design, and real-time AI interactions.

Live Demo : https://couai.vercel.app

## Screenshots
![screenshot-mobile](https://res.cloudinary.com/dyjxcujz4/image/upload/v1738554920/couai_jjeicl.png)
![screenshot-desktop](https://res.cloudinary.com/dyjxcujz4/image/upload/v1738554920/couaire_ou3c3p.png)

## Features

🌍 **Country Data**
- Detailed country information
- Search countries
- Flag displayed on Chromium-based Browsers

🤖 **AI Assistant**
- Powered by Llama-3 405B Instruct model
- Historical and cultural insights
- Natural language interaction
- Real-time response streaming

🔐 **Authentication**
- Google OAuth sign-in
- JWT session management

## Tech Stack

- ⚛️ ReactJS
- 📱 React Router
- 📜 React Markdown
- ⌨️ TypeScript
- 🎨 Styled Components
- 🔄 Apollo GraphQL
- 🔑 Google OAuth
- 🔒 JWT Authentication
- 🚀 Vite
- 📦 PNPM Package Manager

## Getting Started

### Prerequisites

Before you begin, you'll need:

1. **NVIDIA NIM API Key**
   - Visit: https://build.nvidia.com/meta/llama-3_1-405b-instruct
   - Create an account and obtain your API key

2. **Google OAuth Client ID**
   - Visit: https://console.cloud.google.com/apis/credentials
   - Set up a new project and create OAuth credentials

### Installation

1. Clone the repository
    ```bash
    git clone https://github.com/ifalfahri/country-ai-chat.git
    cd country-ai-chat
    ```
2. Install dependencies
   ```bash
   pnpm install
   ```
3. Set up enviroment variables
   - Copy `.env.example` to `.env`
   - Add your API keys:
     - `VITE_NVIDIA_API_KEY` - For AI chat functionality
     - `VITE_GOOGLE_CLIENT_ID` - For Google OAuth

4. Start the development server
   ```bash
   pnpm dev
   ```

## Project Structure
```
src/ 
├── components/ # UI components 
├── context/ # Global state 
├── graphql/ # API queries 
├── hooks/ # Custom hooks 
├── pages/ # Route pages 
├── services/ # External services 
├── styles/ # Global styles 
└── utils/ # Helpers
```

## Future Roadmap
### 🎯 Short Term
- Filter and sort functionality
- Country comparison tool
- Dark mode support

### 🚀 Long Term
- AI improvements with RAG
- Bookmark and Favorites
- Multi-language support
- PWA implementation

## Contributing
Contributions are welcome! If you'd like to contribute, feel free to fork the repository, create a new branch, and submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


## Acknowledgements
- [Countries GraphQL API](https://countries.trevorblades.com/)
- [Country Flag Emoji Polyfill](https://github.com/talkjs/country-flag-emoji-polyfill)