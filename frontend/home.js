// Function to create a post element
function createPostElement(post) {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
  
    // Create the author section
    const authorSection = document.createElement("div");
    authorSection.classList.add("post-author");
  
    // Create the profile picture
    const profilePicture = document.createElement("img");
    profilePicture.src = post.government.icon;
    profilePicture.alt = `${post.government.country}'s Profile Picture`;
    authorSection.appendChild(profilePicture);
  
    // Create the author name
    const authorName = document.createElement("span");
    authorName.textContent = post.government.country;
    authorSection.appendChild(authorName);
  
    // Add the author section to the post element
    postElement.appendChild(authorSection);
  
    // Create the post content
    const content = document.createElement("p");
    content.textContent = post.content;
    postElement.appendChild(content);
  
    return postElement;
  }
  
  // Function to render the posts
  function renderPosts(posts) {
    const postContainer = document.getElementById("post-container");
    postContainer.innerHTML = ""; // Clear previous posts
    posts.forEach((post) => {
      const postElement = createPostElement(post);
      postContainer.appendChild(postElement);
    });
  }
  
  // Fetch posts from the API
  function fetchPosts() {
    const apiUrl = "http://localhost:3000/api/post"; // Replace with your API endpoint
    return fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        return response.json();
      })
      .then((data) => data.result)
      .catch((error) => {
        console.error(error);
        return []; // Return an empty array if there's an error
      });
  }
  
  // Add event listener to the "Write a Post" button
  const writePostBtn = document.getElementById("send-post-btn");
  writePostBtn.addEventListener("click", async () => {
    // Add your logic for writing a post here
    const sendPostContent = document.getElementById("post-input").value;
    document.getElementById("post-input").value = "";
    const Id = "556e18c5-47a0-47c4-acf0-82889502717d"
    const api = "http://localhost:3000/api/post"
    console.log(sendPostContent)
    
    const retorno = await fetch(api, {
      method: 'POST', // specify the method
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: sendPostContent,
        governmentId: Id
      })
    }).then(res => res.json()).then(data => data.result);

    post = {
      government: {
        icon: retorno.icon,
        country: retorno.country
      },
      content: sendPostContent
    }

    const postContainer = document.getElementById("post-container");
    const postElement = createPostElement(post);
    postContainer.appendChild(postElement);

  });
  
  // Fetch and render posts when the page loads
  fetchPosts()
    .then(data => renderPosts(data))
    .catch((error) => console.error(error));
  