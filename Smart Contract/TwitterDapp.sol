// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TwitterDapp {
    struct Post {
        string message;
        address author;
        uint likes;
        uint dislikes;
        uint createdAt;
        uint modifiedAt;
        mapping(address => bool) likedBy;  // Tracks accounts that liked this post
        mapping(address => bool) dislikedBy;  // Tracks accounts that disliked this post
    }

    Post[] public posts;

    // Publish a new post
    function publishPost(string memory _message) public {
        Post storage newPost = posts.push();
        newPost.message = _message;
        newPost.author = msg.sender;
        newPost.likes = 0;
        newPost.dislikes = 0;
        newPost.createdAt = block.timestamp;
        newPost.modifiedAt = 0;
    }

    // Like a post
    function likePost(uint index) public {
        require(index < posts.length, "Post does not exist.");
        Post storage post = posts[index];
        require(!post.likedBy[msg.sender], "You have already liked this post.");
        require(!post.dislikedBy[msg.sender], "Remove dislike before liking.");

        post.likedBy[msg.sender] = true;
        post.likes += 1;
    }

    // Dislike a post
    function dislikePost(uint index) public {
        require(index < posts.length, "Post does not exist.");
        Post storage post = posts[index];
        require(!post.dislikedBy[msg.sender], "You have already disliked this post.");
        require(!post.likedBy[msg.sender], "Remove like before disliking.");

        post.dislikedBy[msg.sender] = true;
        post.dislikes += 1;
    }

    // Remove a like
    function removeLike(uint index) public {
        require(index < posts.length, "Post does not exist.");
        Post storage post = posts[index];
        require(post.likedBy[msg.sender], "You haven't liked this post.");

        post.likedBy[msg.sender] = false;
        post.likes -= 1;
    }

    // Remove a dislike
    function removeDislike(uint index) public {
        require(index < posts.length, "Post does not exist.");
        Post storage post = posts[index];
        require(post.dislikedBy[msg.sender], "You haven't disliked this post.");

        post.dislikedBy[msg.sender] = false;
        post.dislikes -= 1;
    }

    // Get post details
    function getPost(uint index) public view returns (string memory, address, uint, uint, uint, uint) {
        require(index < posts.length, "Post does not exist.");
        Post storage post = posts[index];
        return (post.message, post.author, post.likes, post.dislikes, post.createdAt, post.modifiedAt);
    }

    // Modify a post
    function modifyPost(uint index, string memory _newMessage) public {
        require(index < posts.length, "Post does not exist.");
        require(posts[index].author == msg.sender, "Only the author can modify the post.");
        
        posts[index].message = _newMessage;
        posts[index].modifiedAt = block.timestamp;
    }

    // Get the total number of posts
    function getTotalPosts() public view returns (uint) {
        return posts.length;
    }

    // Get a list of posts liked by the user
    function getUserLikes(address user) public view returns (uint[] memory) {
        uint[] memory likedPosts = new uint[](posts.length);
        uint count = 0;

        for (uint i = 0; i < posts.length; i++) {
            if (posts[i].likedBy[user]) {
                likedPosts[count] = i;
                count++;
            }
        }

        uint[] memory result = new uint[](count);
        for (uint i = 0; i < count; i++) {
            result[i] = likedPosts[i];
        }
        return result;
    }

    // Get a list of posts disliked by the user
    function getUserDislikes(address user) public view returns (uint[] memory) {
        uint[] memory dislikedPosts = new uint[](posts.length);
        uint count = 0;

        for (uint i = 0; i < posts.length; i++) {
            if (posts[i].dislikedBy[user]) {
                dislikedPosts[count] = i;
                count++;
            }
        }

        uint[] memory result = new uint[](count);
        for (uint i = 0; i < count; i++) {
            result[i] = dislikedPosts[i];
        }
        return result;
    }
}
