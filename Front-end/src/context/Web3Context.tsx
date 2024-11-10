// src/context/Web3Context.tsx
'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/lib/constants';

interface Web3ContextType {
  account: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  publishPost: (message: string) => Promise<void>;
  likePost: (index: number) => Promise<void>;
  dislikePost: (index: number) => Promise<void>;
  modifyPost: (index: number, message: string) => Promise<void>;
  getPosts: () => Promise<void>;
  getUserLikes: (address: string) => Promise<number[]>;
  getUserDislikes: (address: string) => Promise<number[]>;
  posts: any[];
  loading: boolean;
  userLikes: number[];
  userDislikes: number[];
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function Web3Provider({ children }: { children: ReactNode }) {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [userLikes, setUserLikes] = useState<number[]>([]);
  const [userDislikes, setUserDislikes] = useState<number[]>([]);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const web3Instance = new Web3(window.ethereum);
        const contractInstance = new web3Instance.eth.Contract(
          CONTRACT_ABI as AbiItem[],
          CONTRACT_ADDRESS
        );

        setWeb3(web3Instance);
        setAccount(accounts[0]);
        setContract(contractInstance);

        // Add event listener for account changes
        window.ethereum.on('accountsChanged', (newAccounts: string[]) => {
          setAccount(newAccounts[0] || null);
          if (newAccounts[0]) {
            refreshUserInteractions(newAccounts[0]);
          } else {
            setUserLikes([]);
            setUserDislikes([]);
          }
        });
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const disconnectWallet = () => {
    setWeb3(null);
    setAccount(null);
    setContract(null);
    setUserLikes([]);
    setUserDislikes([]);
  };

  const getUserLikes = async (address: string) => {
    if (!contract) return [];
    try {
      const likes = await contract.methods.getUserLikes(address).call();
      return likes.map(Number);
    } catch (error) {
      console.error('Error fetching user likes:', error);
      return [];
    }
  };

  const getUserDislikes = async (address: string) => {
    if (!contract) return [];
    try {
      const dislikes = await contract.methods.getUserDislikes(address).call();
      return dislikes.map(Number);
    } catch (error) {
      console.error('Error fetching user dislikes:', error);
      return [];
    }
  };

  const refreshUserInteractions = async (userAddress?: string) => {
    const address = userAddress || account;
    if (contract && address) {
      const likes = await getUserLikes(address);
      const dislikes = await getUserDislikes(address);
      setUserLikes(likes);
      setUserDislikes(dislikes);
    }
  };

  const getPosts = async () => {
    if (!contract) return;

    try {
      setLoading(true);
      const totalPosts = await contract.methods.getTotalPosts().call();
      const postsData = await Promise.all(
        Array.from({ length: Number(totalPosts) }, (_, i) =>
          contract.methods.getPost(i).call()
        )
      );
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const publishPost = async (message: string) => {
    if (!contract || !account) return;

    try {
      await contract.methods.publishPost(message).send({ from: account });
      await getPosts();
    } catch (error) {
      console.error('Error publishing post:', error);
    }
  };

  const likePost = async (index: number) => {
    if (!contract || !account) return;

    try {
      const hasLiked = userLikes.includes(index);
      if (hasLiked) {
        await contract.methods.removeLike(index).send({ from: account });
      } else {
        await contract.methods.likePost(index).send({ from: account });
      }
      await refreshUserInteractions();
      await getPosts();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const dislikePost = async (index: number) => {
    if (!contract || !account) return;

    try {
      const hasDisliked = userDislikes.includes(index);
      if (hasDisliked) {
        await contract.methods.removeDislike(index).send({ from: account });
      } else {
        await contract.methods.dislikePost(index).send({ from: account });
      }
      await refreshUserInteractions();
      await getPosts();
    } catch (error) {
      console.error('Error toggling dislike:', error);
    }
  };

  const modifyPost = async (index: number, message: string) => {
    if (!contract || !account) return;

    try {
      await contract.methods.modifyPost(index, message).send({ from: account });
      await getPosts();
    } catch (error) {
      console.error('Error modifying post:', error);
    }
  };

  useEffect(() => {
    if (contract && account) {
      refreshUserInteractions();
    }
  }, [contract, account]);

  useEffect(() => {
    if (contract) {
      getPosts();
    }
  }, [contract]);

  return (
    <Web3Context.Provider
      value={{
        account,
        connectWallet,
        disconnectWallet,
        publishPost,
        likePost,
        dislikePost,
        modifyPost,
        getPosts,
        getUserLikes,
        getUserDislikes,
        posts,
        loading,
        userLikes,
        userDislikes,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3Context() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3Context must be used within a Web3Provider');
  }
  return context;
}