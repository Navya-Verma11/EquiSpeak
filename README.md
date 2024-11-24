# EqualSpeak: AI-Powered Gender-Neutral Communication Assistant

EqualSpeak is an AI-powered platform designed to analyze and rectify gender-biased language in real time. It aims to promote gender-neutral communication and create a more inclusive environment by detecting and suggesting changes to biased language in user input.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Challenges We Faced](#challenges-we-faced)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)

## Introduction

EqualSpeak is designed to make daily communication more inclusive by detecting subtle gender biases in the language we use and offering real-time corrections. The AI model identifies gendered terms or biased language and suggests gender-neutral alternatives. This tool can be used in various contexts including business communication, educational resources, and everyday writing.

## Features

- **Real-Time Analysis**: The platform processes the text and detects biased language in real-time.
- **Interactive Suggestions**: Provides users with gender-neutral language suggestions that can be applied instantly.
- **Educative Approach**: Highlights biased language and educates users on gender-neutral alternatives.
- **Seamless Integration**: Built with a user-friendly interface using React, ensuring a smooth interaction with the platform.
- **Scalability**: Capable of integration with corporate communication tools, document editors, and even educational platforms.

## Technology Stack

- **Frontend**: React.js for building an interactive user interface.
- **AI API**: Groq's API powered by the "llama3-8b-8192" model for detecting gender bias.
- **Backend**: Node.js for handling API requests (optional, depending on architecture).
- **Deployment**: Vercel or Netlify for easy and scalable deployment.

## Installation

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Clone the Repository

```bash
git clone https://github.com/NavyaVerma11/equalspeak.git
cd equalspeak
```

### Install Dependencies

Install the necessary dependencies:

```bash
npm install
```

### API Setup

1. Obtain API credentials from Groq API.
2. Create a `.env` file in the root directory and add your API key:

```bash
REACT_APP_GROQ_API_KEY=your-api-key-here
```

### Running the App

To start the development server:

```bash
npm start
```

Your app will be available at http://localhost:3000.

### Building for Production

To create a production build of the app:

```bash
npm run build
```

## Usage

1. Enter your text into the provided input box.
2. As you type, EqualSpeak analyzes your text in real time, identifying gendered terms or biased language.
3. If gender bias is detected, the system suggests gender-neutral alternatives.
4. You can apply the suggestions with a single click.

## Challenges We Faced

While building EqualSpeak, we encountered several technical challenges:

- **Latency in API Calls**: Real-time analysis required handling API requests efficiently to avoid input lag. We overcame this by implementing a debounce mechanism in React to reduce unnecessary API calls while the user was typing.
- **Bias Detection Accuracy**: Training the AI model to detect subtle biases without overcorrecting required significant fine-tuning. We leveraged the "llama3-8b-8192" language model for its deep learning capabilities in language understanding.
- **User Interface Complexity**: Ensuring a seamless, intuitive user experience while providing real-time feedback required careful UI/UX design. Using React's component-based architecture helped us manage this complexity.

## Future Enhancements

- **Crowd-Sourced Term Updates**: Allow users to contribute biased terms and gender-neutral alternatives.
- **Analytics Dashboard**: Add a feature to track common biases in specific industries or regions.
- **Integrations**: Extend the platform's reach by integrating EqualSpeak with popular writing and communication platforms like Gmail, Google Docs, and Slack.

## Contributing

We welcome contributions! If you would like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

