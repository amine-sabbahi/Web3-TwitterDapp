# Web3 Twitter - Mini Social Media DApp

### Project Overview

This project is a decentralized social media application inspired by Twitter, built on the Ethereum blockchain. It aims to leverage Web3 technology to provide a censorship-resistant platform where users can publish posts, like or dislike them, and view content in a transparent, decentralized manner. The DApp is developed with a minimalist design and consists of two main components: 
1. A **Solidity-based smart contract** that manages posts and user interactions.
2. A **front-end interface** for seamless user interaction with the blockchain.

[!interface](interface.png)

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Smart Contract Overview](#smart-contract-overview)
- [Frontend Architecture](#frontend-architecture)
- [Conclusion](#conclusion)

---

## Features

### 1. User Authentication
- **Decentralized Login**: Users can log in with their MetaMask wallet, ensuring privacy and security without traditional passwords.
- **Automatic Account Switching**: Seamlessly supports interactions from multiple wallets.
  
### 2. Content Management
- **Post Creation and Modification**: Users can publish posts directly to the blockchain and edit them if they are the author.
- **Real-Time Updates**: Changes are instantly reflected on the DApp interface for all users.
[!interface](posts-card.png)
### 3. Post Interactions
- **Like/Dislike System**: Users can like or dislike posts, with the smart contract preventing duplicate actions.
- **User-Specific Controls**: Only the author can edit their posts, and user-specific posts are highlighted.
[!interface](actual-post.png)
### 4. Responsive UI
- **Web3 Integration**: Seamless blockchain interaction with Web3.js.
- **Visual Feedback and Error Handling**: Intuitive feedback for blockchain transactions, with error handling for failed connections or transactions.
- **Mobile-Friendly Design**: Optimized for multiple screen sizes.

---

## Technology Stack

### 1. Smart Contract
- **Solidity** (v0.8+): Smart contract logic for post management, likes/dislikes, and content modifications.
- **Hardhat**: Local blockchain environment for testing and debugging.

### 2. Frontend
- **Next.js** (v13+): Efficient SSR and SSG, enabling fast load times.
- **TypeScript**: Ensures type safety across the codebase.
- **TailwindCSS**: Provides responsive and modular styling.
- **Shadcn/UI**: Creates consistent and reusable components for the DApp.

### 3. Web3 Integration
- **Web3.js**: Facilitates blockchain interaction from the frontend.
- **MetaMask**: Wallet integration for user authentication and transaction signing.

---

## Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/amine-sabbahi/Web3-TwitterDapp.git
  cd web3-twitter-dapp/twitter-dapp
  ```
2. Deploy the smart contract using Hardhat and remix:
  ```bash
  npx hardhat
  npx hardhat node
  ```
3. Start the development server:
  ```bash
  npm run dev
  ```

## Smart Contract Overview

The TwitterDapp smart contract manages posts and interactions. Key components include:

- **Post Struct**: Contains fields for message, author, likes, dislikes, and timestamps.
- **Post Management Functions**: `publishPost`, `modifyPost` - functions to create and modify posts.
- **Interaction Functions**: `likePost`, `dislikePost`, `removeLike`, `removeDislike` - functions for user interactions with posts.
- **Retrieval Functions**: `getPost`, `getTotalPosts`, `getUserLikes`, `getUserDislikes` - functions to retrieve posts and interaction data.

## Frontend Architecture

- **Web3Context**: Manages wallet connectivity, contract instances, and real-time updates for user interactions.
- **Component Structure**:
  - **Post**: Displays posts with like/dislike interactions.
  - **CreatePost**: Form for users to publish new posts.
  - **Navbar**: Navigation and wallet connection.

## Conclusion

This Web3 Twitter-like DApp combines decentralized technology with familiar social media features, providing a secure and transparent platform for content creation and interaction on the blockchain. The project showcases the potential of blockchain in enabling censorship-resistant, user-driven social media platforms.

---

## Abdelmalek Essaadi University  
Faculty of Science and Technology Tangier  
Computer Engineering Department  
Master: AIDS  
Module: Blockchain
**Realized by:** SABBAHI Mohamed Amine  
**Framed by:** Pr. Ikram Ben abdel ouahab  
